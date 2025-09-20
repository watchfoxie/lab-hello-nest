import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/messages.constants';

type BodyParserJsonError = {
  type?: string;
  status?: number;
  statusCode?: number;
  body?: string;
  message?: string;
  expose?: boolean;
};

/**
 * Middleware Express pentru gestionarea erorilor, utilizat pentru a personaliza răspunsurile în cazul corpurilor JSON malformate.
 * Acesta rulează înaintea pipes/filters din Nest, deoarece parsarea JSON are loc în body-parser.
 */
export const jsonBodyParserErrorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isJsonSyntaxError(err)) {
    return next(err as any);
  }

  const field = inferFieldNameFromError(err) ?? 'json_body';

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
};

function isJsonSyntaxError(err: unknown): boolean {
  const e = err as BodyParserJsonError;
  // body-parser sets: type = 'entity.parse.failed', status = 400, expose = true, body = raw string
  const isSyntax =
    (err as any) instanceof SyntaxError || e?.type === 'entity.parse.failed';
  const isBadRequest = e?.status === 400 || e?.statusCode === 400;
  const hasBody = typeof e?.body === 'string';
  const mentionsJson =
    typeof e?.message === 'string' &&
    /JSON|Unexpected|position|column|line/i.test(e.message);
  return Boolean(
    isSyntax && (isBadRequest || mentionsJson) && (hasBody || mentionsJson),
  );
}

function inferFieldNameFromError(err: unknown): string | null {
  try {
    const e = err as BodyParserJsonError;
    const raw: string | undefined =
      typeof e?.body === 'string' ? e.body : undefined;
    if (!raw) return null;

    // Încercarea de a extrage poziția numerică din mesajul de eroare
    let pos: number | null = null;
    if (typeof e?.message === 'string') {
      const m = e.message.match(/position\s+(\d+)/i);
      if (m && m[1]) pos = Number(m[1]);
    }

    const searchUntil = Number.isFinite(pos)
      ? Math.max(0, Math.min(raw.length, pos as number))
      : raw.length;
    const prefix = raw.slice(0, searchUntil);
    // Găsirea ultimei proprietăți înainte de eroare: "propName" :
    const propRegex = /"([^"\\]+)"\s*:/g;
    let match: RegExpExecArray | null = null;
    let lastName: string | null = null;
    while ((match = propRegex.exec(prefix)) !== null) {
      lastName = match[1];
    }
    return lastName;
  } catch {
    return null;
  }
}
