import { Column, Model, Table, DataType } from 'sequelize-typescript';

type category = {
  id: number;
  name: string;
};

@Table
export class Piece extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataType.JSON })
  category: category;

  @Column({ allowNull: false, type: DataType.STRING })
  product: string;
}

/*
  id: number;
  category: CategoryDto;
  product: string;
*/
