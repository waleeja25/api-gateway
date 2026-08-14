import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GRPC_CLIENTS, GRPC_PACKAGES, PROTO_PATHS } from '../common';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_CLIENTS.CATALOG,
        transport: Transport.GRPC,
        options: {
          package: GRPC_PACKAGES.CATALOG,
          protoPath: PROTO_PATHS.CATALOG,
          url: process.env.GRPC_CATALOG_SERVICE_URL,
        },
      },
    ]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [CategoryService, ProductService],
})
export class CatalogModule {}
