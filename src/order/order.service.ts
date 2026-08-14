import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { OrderProto } from 'microservices-proto';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../common';

@Injectable()
export class OrderService extends CrudGrpcGateway<
  OrderProto.CreateOrderRequest,
  never,
  OrderProto.Order,
  OrderProto.OrderListResponse,
  OrderProto.ListOrderRequest
> {
  constructor(
    @Inject(GRPC_CLIENTS.ORDER)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.ORDER);
  }
}
