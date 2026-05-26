
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  name!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;
}