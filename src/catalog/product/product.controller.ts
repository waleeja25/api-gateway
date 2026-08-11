import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PositiveIntPipe } from '../../common';

import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto';

import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  async list(@Query() query: ProductQueryDto) {
    return this.productService.list({
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }

  @Get(':id')
  async getById(@Param('id', PositiveIntPipe) id: number) {
    return this.productService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update({
      id,
      ...dto,
    });
  }

  @Delete(':id')
  async delete(@Param('id', PositiveIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
