import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../../common';
import type { Empty } from '../../common';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryResponse,
  CategoryListResponse,
} from './interface';

@Injectable()
export class CategoryService extends CrudGrpcGateway<
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryResponse,
  CategoryListResponse,
  Empty
> {
  constructor(
    @Inject(GRPC_CLIENTS.CATALOG)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.CATEGORY);
  }
}
