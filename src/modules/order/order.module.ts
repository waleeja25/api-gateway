import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  GRPC_CLIENTS,
  GRPC_PACKAGES,
  PROTO_PATHS,
  GRPC_CONFIG_KEYS,
} from '../../common';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_CLIENTS.ORDER,

        inject: [ConfigService],

        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,

          options: {
            package: GRPC_PACKAGES.ORDER,
            protoPath: PROTO_PATHS.ORDER,
            url: configService.getOrThrow<string>(
              GRPC_CONFIG_KEYS.ORDER_SERVICE_URL,
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
