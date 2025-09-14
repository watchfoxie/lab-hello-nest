/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${url} - START`);

    return next.handle().pipe(
      tap({
        next: () => {
          const endTimestamp = new Date().toISOString();
          console.log(`[${endTimestamp}] ${method} ${url} - SUCCESS`);
        },
        error: (error) => {
          const endTimestamp = new Date().toISOString();
          console.log(
            `[${endTimestamp}] ${method} ${url} - ERROR: ${error.message}`,
          );
        },
      }),
    );
  }
}
