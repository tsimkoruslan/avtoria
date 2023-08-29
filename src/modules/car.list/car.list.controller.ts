import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CarListService } from './car.list.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarlistDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateCarResponse } from './response';

@ApiTags('API')
@UseGuards(JwtAuthGuard)
@Controller('carlist')
export class CarListController {
  constructor(private readonly carListService: CarListService) {}

  @ApiResponse({ status: 201, type: CreateCarResponse })
  @Post('create')
  createCar(
    @Body() assetDto: CarlistDTO,
    @Req() request,
  ): Promise<CreateCarResponse> {
    const user = request.user;
    return this.carListService.createCar(user, assetDto);
  }

  @ApiResponse({ status: 200 })
  @Delete()
  deleteCar(@Query('id') assetId: string, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.carListService.deleteCar(id, assetId);
  }
}
