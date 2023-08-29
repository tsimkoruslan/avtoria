import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards, UsePipes,
} from '@nestjs/common';
import { CarListService } from './car.list.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarlistDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateCarResponse } from './response';
import { ProfanityValidationPipe } from '../../validation.pipe/profanity.validation.pipe';

@ApiTags('API')
@UseGuards(JwtAuthGuard)
@Controller('carlist')
export class CarListController {
  constructor(private readonly carListService: CarListService) {}


  @ApiResponse({ status: 201, type: CreateCarResponse })
  @Post('create')
  @UsePipes(ProfanityValidationPipe)
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
