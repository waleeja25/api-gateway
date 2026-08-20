import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  GRPC_USER_SERVICE_URL: Joi.string().required(),
  GRPC_CATALOG_SERVICE_URL: Joi.string().required(),
  GRPC_ORDER_SERVICE_URL: Joi.string().required(),
});
