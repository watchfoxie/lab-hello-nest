/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ERROR_MESSAGES } from '../common/constants/messages.constants';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform<T = unknown>(
    value: T,
    { metatype }: ArgumentMetadata,
  ): Promise<T> {
    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value) as object;
    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = this.formatValidationErrors(errors);
      throw new BadRequestException(
        `${ERROR_MESSAGES.VALIDATION_FAILED}: ${messages}`,
      );
    }

    return value;
  }

  private shouldValidate(metatype: new (...args: any[]) => unknown): boolean {
    const excludedTypes = [String, Boolean, Number, Array, Object];
    return !excludedTypes.includes(metatype as any);
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors.map((error) => this.formatSingleError(error)).join('; ');
  }

  private formatSingleError(error: ValidationError): string {
    const property = error.property.toUpperCase();
    const constraints = Object.values(error.constraints ?? {});
    return `câmp ${property}: ${constraints.join(', ')}`;
  }
}
