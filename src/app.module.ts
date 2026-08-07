import { Module } from '@nestjs/common';

import { AppConfigModule } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [AppConfigModule, UserModule],
})
export class AppModule {}
