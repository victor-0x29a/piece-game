import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Game } from './game.entity';

@Table
export class Play extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  date: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  userID: number;

  @ForeignKey(() => Game)
  @Column({ allowNull: false, type: DataType.INTEGER })
  gameID: number;

  @BelongsTo(() => Game)
  game: Game;
  //@BelongsTo(()=>Game)
}
