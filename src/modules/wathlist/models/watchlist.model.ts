import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class Watchlist extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  assetId: string;
}
