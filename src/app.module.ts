import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';

import { AppConfigModule } from './config';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter, LoggingMiddleware } from './common';
import { CatalogModule } from './catalog/catalog.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AppConfigModule, UserModule, CatalogModule, OrderModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
