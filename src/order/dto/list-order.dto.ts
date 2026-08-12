import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class ListOrderDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive({
    message: 'User ID must be greater than 0',
  })
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive({
    message: 'Product ID must be greater than 0',
  })
  productId?: number;
}
