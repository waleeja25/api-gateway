import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  GRPC_CLIENTS,
  GRPC_PACKAGES,
  PROTO_PATHS,
  GRPC_CONFIG_KEYS,
} from '../common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_CLIENTS.USER,

        inject: [ConfigService],

        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,

          options: {
            package: GRPC_PACKAGES.USER,
            protoPath: PROTO_PATHS.USER,
            url: configService.getOrThrow<string>(
              GRPC_CONFIG_KEYS.USER_SERVICE_URL,
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
