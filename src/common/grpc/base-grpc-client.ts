import { OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

import { Observable, firstValueFrom } from 'rxjs';

export abstract class BaseGrpcClient<
  TGrpcService extends object,
> implements OnModuleInit {
  protected service!: TGrpcService;

  constructor(
    protected readonly client: ClientGrpc,
    private readonly serviceName: string,
  ) {}

  onModuleInit(): void {
    this.service = this.client.getService<TGrpcService>(this.serviceName);
  }

  protected call<TResult>(observable: Observable<TResult>): Promise<TResult> {
    return firstValueFrom(observable);
  }
}
