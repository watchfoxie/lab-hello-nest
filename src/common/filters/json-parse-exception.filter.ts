import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_MESSAGES } from '../constants/messages.constants';

@Catch(SyntaxError)
export class JsonParseExceptionFilter implements ExceptionFilter {
  catch(exception: SyntaxError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Verifică dacă este o eroare de parsare JSON
    if (this.isJsonParseError(exception)) {
      const fieldName = this.extractFieldNameFromError();

      const errorResponse = {
        message: [
          {
            field: fieldName,
            message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.JSON_SYNTAX_ERROR}`,
          },
        ],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      };

      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
      return;
    }

    // Dacă nu este o eroare de parsare JSON, lasă să fie gestionată de alte filters
    throw exception;
  }

  private isJsonParseError(exception: SyntaxError): boolean {
    return (
      exception.message.includes('JSON') &&
      (exception.message.includes('position') ||
        exception.message.includes('Unexpected') ||
        exception.message.includes('Expected'))
    );
  }

  private extractFieldNameFromError(): string {
    return 'json_body';
  }
}
