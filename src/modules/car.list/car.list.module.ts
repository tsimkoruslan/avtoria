import { Module } from '@nestjs/common';
import { CarListController } from './car.list.controller';
import { CarListService  } from './car.list.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarList } from './models/carlist.model';

@Module({
  imports: [SequelizeModule.forFeature([CarList])],
  controllers: [CarListController],
  providers: [CarListService],
})
export class CarListModule {}
