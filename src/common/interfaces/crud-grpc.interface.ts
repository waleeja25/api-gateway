import { Observable } from 'rxjs';

export interface CrudGrpcService<
  TCreateRequest,
  TUpdateRequest,
  TEntity,
  TListResponse,
> {
  create(request: TCreateRequest): Observable<TEntity>;

  getById(request: { id: number }): Observable<TEntity>;

  update(request: TUpdateRequest): Observable<TEntity>;

  delete(request: { id: number }): Observable<void>;

  list(request?: any): Observable<TListResponse>;
}
