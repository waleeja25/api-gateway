import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PositiveIntPipe, ResourceName } from '../../common';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@ResourceName('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }

  @Get()
  listUsers() {
    return this.userService.list({});
  }

  @Get(':id')
  getUserById(
    @Param('id', PositiveIntPipe)
    id: number,
  ) {
    return this.userService.getById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', PositiveIntPipe)
    id: number,

    @Body()
    dto: UpdateUserDto,
  ) {
    return this.userService.update({
      id,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }

  @Delete(':id')
  deleteUser(
    @Param('id', PositiveIntPipe)
    id: number,
  ) {
    return this.userService.delete(id);
  }
}
