import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarList} from './models/carlist.model';
import { CreateCarResponse } from './response';

@Injectable()
export class CarListService {
  constructor(
    @InjectModel(CarList)
    private readonly CarListRepository: typeof CarList,
  ) {}

  async createCar(user, dto): Promise<CreateCarResponse> {
    try {
      const carlist = {
        user: user.id,
        car: dto.car,
        currency: dto.currency,
        price: dto.price,
        carId: dto.carId,
      };
      await this.CarListRepository.create(carlist);
      return carlist;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteCar(userId: number, carId: string): Promise<boolean> {
    try {
      await this.CarListRepository.destroy({
        where: { id: carId, user: userId },
      });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
