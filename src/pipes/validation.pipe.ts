import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform<T = unknown>(
    value: T,
    { metatype }: ArgumentMetadata,
  ): Promise<T> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value) as object;
    const errors = await validate(object);
    if (Array.isArray(errors) && errors.length > 0) {
      const messages = errors
        .map(
          (err) =>
            `câmp ${err.property.toUpperCase()}: ${Object.values(err.constraints ?? {}).join(', ')}`,
        )
        .join('; ');
      throw new BadRequestException(`Validarea a eșuat: ${messages}`);
    }
    return value;
  }

  private toValidate(metatype: new (...args: any[]) => unknown): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.some((type) => metatype === type);
  }
}
