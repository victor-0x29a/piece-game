import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decodedToken } from './types/auth.type';

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private service: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const token: string | undefined = context.switchToHttp().getRequest()
      .headers['authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.service.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      const decodedToken: decodedToken | string | any =
        await this.service.decode(token);
      if (decodedToken.authLevel < 2) {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
