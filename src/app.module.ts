import { Module } from '@nestjs/common';

import { AppConfigModule } from './config';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common';

@Module({
  imports: [AppConfigModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
