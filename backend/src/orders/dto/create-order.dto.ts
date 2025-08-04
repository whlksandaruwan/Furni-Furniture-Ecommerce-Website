import { IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  shippingAddress: string;

  @IsOptional()
  @IsString()
  billingAddress?: string;

  @IsOptional()
  @IsString()
  notes?: string;
} 