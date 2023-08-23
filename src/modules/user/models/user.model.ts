import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  userName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
