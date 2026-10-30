import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T> {
  success: boolean;
  data?: T;
  meta?: Record<string, any>;
  [key: string]: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    return next.handle().pipe(
      map((data) => {
        // If data is already in standard format, return directly
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // If data has explicit data/meta separation
        if (data && typeof data === 'object' && ('data' in data || 'meta' in data)) {
          return {
            success: true,
            ...data,
          };
        }

        return {
          success: true,
          data,
        };
      }),
    );
  }
}
