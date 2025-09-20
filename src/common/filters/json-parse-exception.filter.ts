/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ERROR_MESSAGES } from '../constants/messages.constants';

@Catch()
export class JsonParseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // Încearcă să detecteze erorile de parsare JSON produse de body-parser / JSON.parse
    const { isJsonError, pos, raw } = this.extractJsonErrorDetails(exception);

    if (!isJsonError) {
      // Pas prin: păstrează comportamentul original Nest pentru erorile care nu sunt de parsare JSON
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const body = exception.getResponse();
        return res.status(status).json(body);
      }
      // Rezervă pentru erori necunoscute
      const status =
        (exception as any)?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const messageText =
        (exception as any)?.message || 'Internal Server Error';
      return res.status(status).json({
        message: messageText,
        error: status === 500 ? 'Internal Server Error' : 'Error',
        statusCode: status,
      });
    }

    const field = this.inferFieldNameFromRaw(raw, pos) ?? 'json_body';

    const payload = {
      message: [
        {
          field,
          message: `${ERROR_MESSAGES.VALIDATION_FAILED}: ${ERROR_MESSAGES.JSON_SYNTAX_ERROR}`,
        },
      ],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    } as const;

    return res.status(HttpStatus.BAD_REQUEST).json(payload);
  }

  private extractJsonErrorDetails(exception: unknown): {
    isJsonError: boolean;
    pos: number | null;
    raw: string | null;
  } {
    let message: string | null = null;
    let pos: number | null = null;
    let raw: string | null = null;

    if (exception instanceof BadRequestException) {
      const resp = exception.getResponse() as any;
      // Răspunsul implicit Nest pentru erorile body-parser de obicei are un mesaj de tip string
      if (typeof resp === 'string') message = resp;
      else if (resp && typeof resp.message === 'string') message = resp.message;
      else if (
        Array.isArray(resp?.message) &&
        typeof resp.message[0] === 'string'
      )
        message = resp.message[0];

      // Unele runtime-uri păstrează cauza/corpusul original pe excepție
      const cause: any = (exception as any).cause;
      if (cause && typeof cause.body === 'string') raw = cause.body;
    } else if (exception && typeof (exception as any).message === 'string') {
      message = (exception as any).message as string;
      if (typeof (exception as any).body === 'string')
        raw = (exception as any).body as string;
    }

    if (message) {
      const m = message.match(/position\s+(\d+)/i);
      if (m && m[1]) pos = Number(m[1]);
    }

    const mentionsJson =
      typeof message === 'string' &&
      /JSON|Unexpected|position|column|line|Unterminated/i.test(message);

    return { isJsonError: Boolean(mentionsJson), pos, raw };
  }

  private inferFieldNameFromRaw(
    raw: string | null,
    pos: number | null,
  ): string | null {
    if (!raw) return null;

    const searchUntil = Number.isFinite(pos as number)
      ? Math.max(0, Math.min(raw.length, (pos as number) ?? raw.length))
      : raw.length;
    const prefix = raw.slice(0, searchUntil);
    const propRegex = /"([^"\\]+)"\s*:/g;
    let match: RegExpExecArray | null = null;
    let lastName: string | null = null;
    while ((match = propRegex.exec(prefix)) !== null) {
      lastName = match[1];
    }
    return lastName;
  }
}
