import { Module } from '@nestjs/common';

import { AppConfigModule } from './config';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [AppConfigModule, UserModule, CatalogModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
