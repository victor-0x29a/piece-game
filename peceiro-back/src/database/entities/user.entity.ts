import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataType.CHAR(128) })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  phone: number;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ defaultValue: 1, type: DataType.INTEGER })
  authLevel: number;
}
