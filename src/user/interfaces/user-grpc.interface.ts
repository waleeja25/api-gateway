import { Observable } from 'rxjs';

import {
  CreateUserRequest,
  EntityIdRequest,
  Empty,
  UpdateUserRequest,
  User,
  UserListResponse,
} from '../messages';

export interface UserGrpcService {
  createUser(request: CreateUserRequest): Observable<User>;

  getUserById(request: EntityIdRequest): Observable<User>;

  updateUser(request: UpdateUserRequest): Observable<User>;

  deleteUser(request: EntityIdRequest): Observable<Empty>;

  listUsers(request: Empty): Observable<UserListResponse>;
}
