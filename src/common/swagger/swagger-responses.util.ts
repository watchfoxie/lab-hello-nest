/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS_CODES } from '../status-codes/http-status-codes';

export function ApiStandardResponses(type?: any) {
  const statuses = [
    100, 101, 200, 204, 301, 302, 400, 401, 403, 404, 500, 502, 503, 504,
  ];
  const decorators = statuses.map((status) =>
    ApiResponse({
      status,
      description: HTTP_STATUS_CODES[status],
      ...(type && status === 200 ? { type } : {}),
    }),
  );
  return applyDecorators(...decorators);
}
