import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Piece extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataType.JSON })
  category: object;

  @Column({ allowNull: false, type: DataType.STRING })
  product: string;
}

/*
  id: number;
  category: CategoryDto;
  product: string;
*/
