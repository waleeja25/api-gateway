import type { ClientGrpc } from '@nestjs/microservices';

import { BaseGrpcClient } from './base-grpc-client';
import { CrudGrpcService } from '../interfaces';

export abstract class CrudGrpcGateway<
  TCreateRequest,
  TUpdateRequest,
  TEntity,
  TListResponse,
  TListRequest,
> extends BaseGrpcClient<
  CrudGrpcService<TCreateRequest, TUpdateRequest, TEntity, TListResponse>
> {
  constructor(client: ClientGrpc, serviceName: string) {
    super(client, serviceName);
  }

  create(request: TCreateRequest) {
    return this.call(this.service.create(request));
  }

  getById(id: number) {
    return this.call(this.service.getById({ id }));
  }

  update(request: TUpdateRequest) {
    return this.call(this.service.update(request));
  }

  delete(id: number) {
    return this.call(this.service.delete({ id }));
  }

  list(request: TListRequest): Promise<TListResponse> {
    return this.call(this.service.list(request));
  }
}
