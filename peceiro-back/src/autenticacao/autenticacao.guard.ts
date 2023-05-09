import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private service: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const token: string | undefined = context.switchToHttp().getRequest()
      .headers['authorization'];
    try {
      await this.service.verifyAsync(token, {
        secret: process.env.SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
