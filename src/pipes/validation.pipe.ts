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
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${this.formatSingleError(error)}`,
      }));

      throw new BadRequestException(formattedErrors);
    }

    return value;
  }

  private shouldValidate(metatype: new (...args: any[]) => unknown): boolean {
    const excludedTypes = [String, Boolean, Number, Array, Object];
    return !excludedTypes.includes(metatype as any);
  }

  private formatSingleError(error: ValidationError): string {
    const constraints = Object.values(error.constraints ?? {});
    // Dacă există o eroare de tip, returnează doar mesajul de tip
    const typeError = constraints.find((msg) =>
      msg.includes(ERROR_MESSAGES.VALIDATION_STRING),
    );
    if (typeError) {
      return typeError;
    }
    // Altfel, returnează toate mesajele unice
    const uniqueConstraints = Array.from(new Set(constraints));
    return uniqueConstraints.join(', ');
  }
}
