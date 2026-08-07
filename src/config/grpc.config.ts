import { registerAs } from '@nestjs/config';

export default registerAs('grpc', () => ({
  userServiceUrl: process.env.USER_SERVICE_URL,
}));
