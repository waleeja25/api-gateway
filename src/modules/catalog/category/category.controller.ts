import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PositiveIntPipe, ResourceName } from '../../../common';
import { CategoryService } from './category.service';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@ResourceName('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  async list() {
    return this.categoryService.list({});
  }

  @Get(':id')
  async getById(@Param('id', PositiveIntPipe) id: number) {
    return this.categoryService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update({
      id,
      ...dto,
    });
  }

  @Delete(':id')
  async delete(@Param('id', PositiveIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
