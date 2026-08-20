import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppConfigModule } from './config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  BadRequestExceptionFilter,
  GlobalExceptionFilter,
  LoggingMiddleware,
  ResponseInterceptor,
} from './common';
import { CatalogModule, OrderModule, UserModule } from './modules';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AppConfigModule,
    UserModule,
    CatalogModule,
    OrderModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
