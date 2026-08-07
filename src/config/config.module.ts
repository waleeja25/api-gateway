import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './app.config';
import grpcConfig from './grpc.config';
import { validationSchema } from './validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, grpcConfig],
      validationSchema,
    }),
  ],
})
export class AppConfigModule {}
