import { ENUM } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import { CarList } from '../car.list/carlist.model';
import { roleEnum } from './enum/role.enum';

@Table
export class User extends Model {
  @Column({ type: 'varchar' })
  userName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: ENUM(...Object.values(roleEnum)) })
  role: roleEnum;

  @HasMany(() => CarList, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  carList: CarList[];
}
