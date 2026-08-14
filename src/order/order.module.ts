import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GRPC_CLIENTS, GRPC_PACKAGES, PROTO_PATHS } from '../common';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_CLIENTS.ORDER,
        transport: Transport.GRPC,
        options: {
          package: GRPC_PACKAGES.ORDER,
          protoPath: PROTO_PATHS.ORDER,
          url: process.env.GRPC_ORDER_SERVICE_URL,
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
