import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../common';

import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
  UserListResponse,
} from './messages';

@Injectable()
export class UserService extends CrudGrpcGateway<
  CreateUserRequest,
  UpdateUserRequest,
  User,
  UserListResponse
> {
  constructor(
    @Inject(GRPC_CLIENTS.USER)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.USER);
  }
}
