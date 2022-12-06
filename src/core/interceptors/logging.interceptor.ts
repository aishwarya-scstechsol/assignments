import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name)
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
  this.logger.log("controller initiating")
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Method finished in ... ${Date.now() - now}ms`)),
      );
  }
}