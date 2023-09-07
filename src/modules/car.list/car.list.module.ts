import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CarListController } from './car.list.controller';
import { CarListService } from './car.list.service';
import { CarList } from './carlist.model';

@Module({
  imports: [SequelizeModule.forFeature([CarList])],
  controllers: [CarListController],
  providers: [CarListService],
})
export class CarListModule {}
