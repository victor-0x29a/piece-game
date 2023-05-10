import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { serverResponse } from '../app.constant';
import { UserDTO } from '../user/dto/create-user.dto';
import { User } from '../database/entities/user.entity';
import { loginSchema, registerSchema } from './entities/user.entity.validation';
import { response } from './types/auth.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(private jwt: JwtService) {}
  private Sign(id: number, authLevel: number): response {
    if (id < 0 || authLevel < 1 || authLevel > 2) {
      throw new InternalServerErrorException();
    }
    const keys = {
      id: id,
      authLevel: authLevel,
    };
    const JWT = this.jwt.sign(keys);
    return {
      token: JWT,
      expiresIn: 400,
    };
  }

  private async getUser(email: string): Promise<UserDTO | null> {
    if (!email) {
      throw new NotFoundException('Opa.', 'Confira o email.');
    }
    return await User.findOne({ where: { email: email } });
  }

  public async cadastrar(Body: UserDTO): Promise<serverResponse> {
    const isValid = await registerSchema.safeParseAsync(Body);
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa', isValid.error.errors[0].message);
    }
    const findUser = await User.findOne({ where: { email: Body.email } });
    if (findUser) {
      throw new ConflictException('Uepa!', 'Coloque outro email.');
    }
    return await User.create({
      email: Body.email,
      phone: Body.phone.toString(),
      password: Body.password,
      authLevel: 1,
      name: Body.name,
    })
      .then(() => {
        return {
          error: false,
          message: 'Usuário criado.',
          data: Body,
        };
      })
      .catch((err: Error) => {
        console.log(err);
        throw new InternalServerErrorException(
          'Houve um erro interno.',
          'Tente mais tarde, caso persistir entre no suporte!',
        );
      });
  }

  public async entrar(Body: Partial<UserDTO>): Promise<serverResponse> {
    const isValid = await loginSchema.safeParseAsync(Body);
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa.', isValid.error.errors[0].message);
    }
    const user = await this.getUser(Body.email);

    if (!user) {
      throw new NotFoundException('Opa.', 'Confira o email.');
    }
    const passConfirm = await bcrypt
      .compare(Body.password, user.password)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return false;
      });
    if (!passConfirm) {
      throw new UnauthorizedException();
    }
    const tokenResult = this.Sign(user.id, user.authLevel);
    return {
      error: false,
      message: `Bem-vindo ${user.name}`,
      data: {
        name: user.name,
        phone: user.phone,
        email: user.email,
        ...tokenResult,
      },
    };
  }
}
