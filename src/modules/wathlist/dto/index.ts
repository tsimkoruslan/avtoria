import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WatchlistDTO {
  @ApiProperty()
  @IsString()
  assetId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
