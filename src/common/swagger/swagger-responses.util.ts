/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HTTP_STATUS_CODES } from '../status-codes/http-status-codes';

type HttpStatusCode = keyof typeof HTTP_STATUS_CODES;

export function ApiStandardResponses(type?: Type<any> | [Type<any>]) {
  const commonStatuses: HttpStatusCode[] = [200, 201, 400, 401, 403, 404, 500];

  const decorators = commonStatuses.map((status) => {
    const config: any = {
      status,
      description: HTTP_STATUS_CODES[status],
    };

    // Adaugăm tipul pentru răspunsurile de succes
    if (type && (status === 200 || status === 201)) {
      config.type = type;
    }

    return ApiResponse(config);
  });

  return applyDecorators(...decorators);
}

export function ApiSuccessResponse(
  type: Type<any> | [Type<any>],
  status: 200 | 201 = 200,
) {
  return ApiResponse({
    status,
    description: HTTP_STATUS_CODES[status],
    type,
  });
}

export function ApiErrorResponses() {
  const errorStatuses: HttpStatusCode[] = [400, 401, 403, 404, 500];

  const decorators = errorStatuses.map((status) =>
    ApiResponse({
      status,
      description: HTTP_STATUS_CODES[status],
    }),
  );

  return applyDecorators(...decorators);
}
