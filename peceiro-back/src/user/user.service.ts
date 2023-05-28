import {
  NotFoundException,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { serverResponse } from '../app.constant';
import jwtDecode from 'jwt-decode';
import { User } from '../database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidationUpdate } from './entities/user.entity';
import { decodedToken } from '../autenticacao/types/auth.type';

export class UserService {
  private async getUser(id: number | false) {
    if (typeof id === 'number') {
      return User.findOne({
        where: { id: id },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
    }

    return await User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
  }

  async findAll(): Promise<serverResponse> {
    const users = await this.getUser(false);
    return {
      error: false,
      message: 'Todos os usuários listados.',
      data: users,
    };
  }

  async findOne(id: number): Promise<serverResponse> {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('Humm!', 'Usuário não encontrado.');
    }
    return {
      error: false,
      message: 'Usuário listado.',
      data: user,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<serverResponse> {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('Humm!', 'Usuário não encontrado.');
    }
    const isValid = await UserValidationUpdate.safeParseAsync(updateUserDto);
    if (isValid.success === false) {
      throw new NotAcceptableException(
        'Opa.',
        `${isValid.error.errors[0].message}`,
      );
    }
    return await User.update(
      {
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        name: updateUserDto.name,
      },
      {
        where: {
          id: id,
        },
      },
    )
      .then(() => {
        return {
          error: false,
          message: 'Data atualizada.',
          data: null,
        };
      })
      .catch((err: Error) => {
        return {
          error: true,
          message: 'Houve um erro interno.',
          data: null,
        };
      });
  }

  async remove(id: number): Promise<serverResponse> {
    const user = await this.getUser(id);
    if (!user) {
      throw new NotFoundException('Humm!', 'Usuário não encontrado.');
    }

    return await User.destroy({ where: { id: id } })
      .then(() => {
        return {
          error: false,
          message: 'Usuário deletado.',
          data: [],
        };
      })
      .catch((err: Error) => {
        return {
          error: true,
          message: 'Houve um erro interno.',
          data: [],
        };
      });
  }

  async updateMe(
    req: Request,
    updateUserDto: UpdateUserDto,
  ): Promise<serverResponse> {
    const thisUser: decodedToken | any = jwtDecode(
      req.headers['authorization'],
    );
    const isValid = await UserValidationUpdate.safeParseAsync(updateUserDto);
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa.', isValid.error.errors[0].message);
    }
    return await User.update(
      {
        email: updateUserDto.email,
        name: updateUserDto.name,
        phone: updateUserDto.phone,
      },
      {
        where: {
          id: thisUser.id,
        },
      },
    )
      .then(() => {
        return {
          error: false,
          message: 'Suas informações foram atualizadas.',
          data: {
            token: {
              ...thisUser,
            },
            user: {
              ...updateUserDto,
            },
          },
        };
      })
      .catch((err: Error) => {
        throw new InternalServerErrorException(
          'Hum.',
          'Houve um erro interno, tente novamente mais tarde.',
        );
      });
  }
}
