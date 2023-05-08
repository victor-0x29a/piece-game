import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private service: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const token: string | undefined = this.getToken(
      context.switchToHttp().getRequest(),
    );
    try {
      await this.service.verifyAsync(token, {
        secret: process.env.SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
  private getToken(req: Request): string | undefined {
    const aToken: string | undefined = req?.headers?.get('Authorization');
    return aToken;
  }
}
