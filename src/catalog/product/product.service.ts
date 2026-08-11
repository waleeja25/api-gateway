import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../../common';

import {
  CreateProductRequest,
  UpdateProductRequest,
  ProductResponse,
  ProductListResponse,
  ListProductsRequest,
} from './interface';

@Injectable()
export class ProductService extends CrudGrpcGateway<
  CreateProductRequest,
  UpdateProductRequest,
  ProductResponse,
  ProductListResponse,
  ListProductsRequest
> {
  constructor(
    @Inject(GRPC_CLIENTS.CATALOG)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.PRODUCT);
  }
}
