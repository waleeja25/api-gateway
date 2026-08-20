import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  GRPC_CLIENTS,
  GRPC_PACKAGES,
  PROTO_PATHS,
  GRPC_CONFIG_KEYS,
} from '../../common';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_CLIENTS.CATALOG,

        inject: [ConfigService],

        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,

          options: {
            package: GRPC_PACKAGES.CATALOG,
            protoPath: PROTO_PATHS.CATALOG,
            url: configService.getOrThrow<string>(
              GRPC_CONFIG_KEYS.CATALOG_SERVICE_URL,
            ),
          },
        }),
      },
    ]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [CategoryService, ProductService],
})
export class CatalogModule {}
