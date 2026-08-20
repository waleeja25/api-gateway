import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsPositive({
    message: 'User ID must be greater than 0',
  })
  @IsInt({
    message: 'User ID must be an integer',
  })
  @IsNotEmpty({
    message: 'User ID is required',
  })
  userId!: number;

  @IsPositive({
    message: 'Product ID must be greater than 0',
  })
  @IsInt({
    message: 'Product ID must be an integer',
  })
  @IsNotEmpty({
    message: 'Product ID is required',
  })
  productId!: number;

  @IsPositive({
    message: 'Quantity must be greater than 0',
  })
  @IsInt({
    message: 'Quantity must be an integer',
  })
  @IsNotEmpty({
    message: 'Quantity is required',
  })
  quantity!: number;
}
