import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as Microservices from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { GRPC_CLIENTS, GRPC_SERVICES } from '../common';

import { UserGrpcService } from './interfaces';
import {
  CreateUserRequest,
  EntityIdRequest,
  Empty,
  UpdateUserRequest,
} from './messages';

@Injectable()
export class UserService implements OnModuleInit {
  private userGrpcService!: UserGrpcService;

  constructor(
    @Inject(GRPC_CLIENTS.USER)
    private readonly client: Microservices.ClientGrpc,
  ) {}

  onModuleInit() {
    this.userGrpcService = this.client.getService<UserGrpcService>(
      GRPC_SERVICES.USER,
    );
  }

  async createUser(request: CreateUserRequest) {
    return firstValueFrom(this.userGrpcService.createUser(request));
  }

  async getUserById(request: EntityIdRequest) {
    return firstValueFrom(this.userGrpcService.getUserById(request));
  }

  async updateUser(request: UpdateUserRequest) {
    return firstValueFrom(this.userGrpcService.updateUser(request));
  }

  async deleteUser(request: EntityIdRequest) {
    return firstValueFrom(this.userGrpcService.deleteUser(request));
  }

  async listUsers() {
    return firstValueFrom(this.userGrpcService.listUsers(new Empty()));
  }
}
