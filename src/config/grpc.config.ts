import { registerAs } from '@nestjs/config';

export default registerAs('grpc', () => ({
  userServiceUrl: process.env.GRPC_USER_SERVICE_URL,
}));
