import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { BrandEnum } from './enum/brand.enum';
import { currencyEnum } from './enum/currency.enum';

export class CarlistDTO {
  @ApiProperty({
    description: 'The type of the car',
    enum: BrandEnum,
  })
  @IsEnum(BrandEnum)
  car: BrandEnum;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(currencyEnum)
  currency: currencyEnum;

  @ApiProperty()
  @IsNumber()
  price: number;
}
