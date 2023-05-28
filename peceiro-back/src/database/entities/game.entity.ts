import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Game extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  title: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  description: string;

  @Column({ allowNull: false, type: DataType.JSON })
  sorted: object;

  @Column({ allowNull: false, type: DataType.DATE })
  day: Date;
}
