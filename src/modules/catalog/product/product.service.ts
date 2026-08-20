import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { CatalogProto } from 'microservices-proto';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../../../common';

@Injectable()
export class ProductService extends CrudGrpcGateway<
  CatalogProto.CreateProductRequest,
  CatalogProto.UpdateProductRequest,
  CatalogProto.Product,
  CatalogProto.ProductListResponse,
  CatalogProto.ListProductsRequest
> {
  constructor(
    @Inject(GRPC_CLIENTS.CATALOG)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.PRODUCT);
  }
}
