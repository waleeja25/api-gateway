import { join } from 'path';

export const GRPC_CLIENTS = {
  USER: 'USER_PACKAGE',
  PRODUCT: 'PRODUCT_PACKAGE',
  ORDER: 'ORDER_PACKAGE',
} as const;

export const GRPC_PACKAGES = {
  USER: 'user',
  PRODUCT: 'product',
  ORDER: 'order',
} as const;

export const PROTO_PATHS = {
  USER: join(process.cwd(), '../microservices-proto/proto/user.proto'),
  PRODUCT: join(process.cwd(), '../microservices-proto/proto/product.proto'),
  ORDER: join(process.cwd(), '../microservices-proto/proto/order.proto'),
} as const;

export const GRPC_SERVICES = {
  USER: 'UserService',
  PRODUCT: 'ProductService',
  ORDER: 'OrderService',
} as const;

export const GRPC_CONFIG_KEYS = {
  USER_SERVICE_URL: 'grpc.userServiceUrl',
  PRODUCT_SERVICE_URL: 'grpc.productServiceUrl',
  ORDER_SERVICE_URL: 'grpc.orderServiceUrl',
} as const;
