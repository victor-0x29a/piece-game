import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  public cadastrar(body: Object) {}
}
