import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { PositiveIntPipe, ResourceName } from '../../common';

import { CreateOrderDto, ListOrderDto } from './dto';

import { OrderService } from './order.service';

@ResourceName('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  async list(@Query() query: ListOrderDto) {
    return this.orderService.list({
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      userId: query.userId,
      productId: query.productId,
    });
  }

  @Get(':id')
  async getById(
    @Param('id', PositiveIntPipe)
    id: number,
  ) {
    return this.orderService.getById(id);
  }

  @Delete(':id')
  async delete(
    @Param('id', PositiveIntPipe)
    id: number,
  ) {
    return this.orderService.delete(id);
  }
}
