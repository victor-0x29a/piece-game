import {
  Column,
  Model,
  Table,
  DataType,
  BeforeSave,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id: number;

  @Column({ allowNull: false, type: DataType.CHAR(128) })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.CHAR(12) })
  phone: number;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ defaultValue: 1, type: DataType.INTEGER })
  authLevel: number;

  @BeforeSave
  static crypt(usuario: User) {
    const salt = Math.floor(Math.random() * 9) + 1;
    const hash = bcrypt.hashSync(usuario.password, salt);
    usuario.password = hash;
  }
}
