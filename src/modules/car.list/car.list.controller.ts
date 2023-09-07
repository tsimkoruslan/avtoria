import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CarlistDTO } from './car.list.dto';
import { CarListService } from './car.list.service';
import { CreateCarResponse } from './response';

@ApiTags('API')
@UseGuards(JwtAuthGuard)
@Controller('carlist')
export class CarListController {
  constructor(private readonly carListService: CarListService) {}

  @ApiResponse({ status: 201, type: CreateCarResponse })
  @Post('create')
  async createCar(
    @Body() carDto: CarlistDTO,
    @Req() request,
  ): Promise<CreateCarResponse> {
    const user = request.user;
    return this.carListService.createCar(user, carDto);
  }

  @ApiResponse({ status: 200 })
  @Delete()
  deleteCar(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.carListService.deleteCar(id, assetId);
  }
}
