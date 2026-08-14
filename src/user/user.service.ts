import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { GoogleProtobuf, UserProto } from 'microservices-proto';

import { CrudGrpcGateway, GRPC_CLIENTS, GRPC_SERVICES } from '../common';

@Injectable()
export class UserService extends CrudGrpcGateway<
  UserProto.CreateUserRequest,
  UserProto.UpdateUserRequest,
  UserProto.User,
  UserProto.UserListResponse,
  GoogleProtobuf.Empty
> {
  constructor(
    @Inject(GRPC_CLIENTS.USER)
    client: ClientGrpc,
  ) {
    super(client, GRPC_SERVICES.USER);
  }
}
