import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { currencyEnum } from '../enum/currency.enum';
import { BrandEnum } from '../enum/brand.enum';

export class CarlistDTO {
  @ApiProperty()
  @IsString()
  carId: string;

  @ApiProperty(
    {
      description: 'The type of the car',
      enum: BrandEnum,
    }
  )
  @IsEnum(BrandEnum)
  car: BrandEnum;

  @ApiProperty()
  @IsEnum(currencyEnum)
  currency: currencyEnum;

  @ApiProperty()
  @IsNumber()
  price: number
}
