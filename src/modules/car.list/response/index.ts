import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BrandEnum } from '../enum/brand.enum';
import { currencyEnum } from '../enum/currency.enum';

export class CreateCarResponse {
  @ApiProperty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsEnum(BrandEnum)
  car: BrandEnum;

  @ApiProperty()
  @IsEnum(currencyEnum)
  currency: currencyEnum;

  @ApiProperty()
  @IsNumber()
  price: number

  @ApiProperty()
  @IsString()
  carId: string;


  @ApiProperty()
  @IsString()
  description: string;

}
