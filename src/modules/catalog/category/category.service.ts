import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { CatalogProto, GoogleProtobuf } from 'microservices-proto';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../../../common';

@Injectable()
export class CategoryService extends CrudGrpcGateway<
  CatalogProto.CreateCategoryRequest,
  CatalogProto.UpdateCategoryRequest,
  CatalogProto.Category,
  CatalogProto.CategoryListResponse,
  GoogleProtobuf.Empty
> {
  constructor(
    @Inject(GRPC_CLIENTS.CATALOG)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.CATEGORY);
  }
}
