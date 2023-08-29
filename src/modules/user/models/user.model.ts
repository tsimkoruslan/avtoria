import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CarList } from '../../car.list/models/carlist.model';
import { roleEnum } from '../enum/role.enum';
import { ENUM } from 'sequelize';


@Table
export class User extends Model {

  @Column({ type: 'varchar' })
  userName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({type: ENUM('roleEnum') })
  role: roleEnum

  @HasMany(() => CarList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  carList: CarList[];
}
