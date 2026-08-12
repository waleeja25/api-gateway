import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({
    message: 'User ID is required',
  })
  @IsInt({
    message: 'User ID must be an integer',
  })
  @IsPositive({
    message: 'User ID must be greater than 0',
  })
  userId!: number;

  @IsNotEmpty({
    message: 'Product ID is required',
  })
  @IsInt({
    message: 'Product ID must be an integer',
  })
  @IsPositive({
    message: 'Product ID must be greater than 0',
  })
  productId!: number;

  @IsNotEmpty({
    message: 'Quantity is required',
  })
  @IsInt({
    message: 'Quantity must be an integer',
  })
  @IsPositive({
    message: 'Quantity must be greater than 0',
  })
  quantity!: number;
}
