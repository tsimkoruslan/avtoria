import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from '../../wathlist/models/watchlist.model';

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

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
