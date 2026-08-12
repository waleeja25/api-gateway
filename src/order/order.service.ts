import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../common';

import {
  CreateOrderRequest,
  OrderResponse,
  OrderListResponse,
  ListOrderRequest,
} from './interface';

@Injectable()
export class OrderService extends CrudGrpcGateway<
  CreateOrderRequest,
  never,
  OrderResponse,
  OrderListResponse,
  ListOrderRequest
> {
  constructor(
    @Inject(GRPC_CLIENTS.ORDER)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.ORDER);
  }
}
