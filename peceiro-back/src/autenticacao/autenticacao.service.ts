import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../database/entities/DTO/user.dto';
import { User } from '../database/entities/user.entity';
import { registerSchema } from './entities/user.entity';
import { response } from './types/auth.type';

@Injectable()
export class AutenticacaoService {
  constructor(private jwt: JwtService) {}
  public Sign(id: number, authLevel: number): response {
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

  public async cadastrar(Body: UserDTO) {
    const isValid = await registerSchema.safeParseAsync(Body);
    if (!isValid.success) {
      throw new NotAcceptableException('Opa', 'Confira os campos enviados!');
    }
    return await User.create({
      email: Body.email,
      phone: Body.phone,
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
        return {
          error: true,
          message: 'Houve um erro interno.',
          data: Body,
        };
      });
  }
}
