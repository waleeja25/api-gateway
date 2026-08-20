import { registerAs } from '@nestjs/config';

export default registerAs('grpc', () => ({
  userServiceUrl: process.env.GRPC_USER_SERVICE_URL,
  catalogServiceUrl: process.env.GRPC_CATALOG_SERVICE_URL,
  orderServiceUrl: process.env.GRPC_ORDER_SERVICE_URL,
}));
