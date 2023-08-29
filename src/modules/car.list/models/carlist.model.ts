import { Column, ForeignKey, Model,  Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { currencyEnum } from '../enum/currency.enum';
import { BrandEnum } from '../enum/brand.enum';
import { ENUM } from 'sequelize';

@Table
export class CarList extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column({type: ENUM(...Object.values(BrandEnum))})
  car: BrandEnum;

  @Column({type: 'varchar'})
  description: string

  @Column({type: ENUM(...Object.values(currencyEnum))})
  currency: currencyEnum;

  @Column({ type: 'int' })
  price: number

}
