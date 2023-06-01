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

  @Column({ allowNull: false, type: DataType.JSON })
  choiceds: object;

  @Column({ allowNull: false, type: DataType.STRING })
  date: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  userID: number;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: false })
  winned: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN, defaultValue: false })
  received: boolean;

  @ForeignKey(() => Game)
  @Column({ allowNull: false, type: DataType.INTEGER })
  gameID: number;

  @BelongsTo(() => Game)
  game: Game;
  //@BelongsTo(()=>Game)
}
