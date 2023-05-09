import { Injectable } from '@nestjs/common';
import { serverResponse } from '../app.constant';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private async getUser(id: number | false) {
    if (id !== false) {
      return await User.findOne({ where: { id: id } });
    }

    return await User.findAll();
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<serverResponse> {
    const users = await this.getUser(false);
    return {
      error: false,
      message: 'Todos os usuários listados.',
      data: users,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
