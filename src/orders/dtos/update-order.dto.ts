import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  @IsString()
  clientId!: string;


}