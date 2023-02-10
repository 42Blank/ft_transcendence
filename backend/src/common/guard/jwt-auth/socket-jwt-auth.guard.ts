import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { parse } from 'tough-cookie';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class SocketJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: Socket & { user: JwtPayload } = context.switchToWs().getClient();

    const tokenCookie = socket.handshake.headers.cookie
      .split(';')
      .map(v => v.trim())
      .find(v => v.startsWith('access_token='));

    if (!tokenCookie) {
      throw new UnauthorizedException('No token provided');
    }

    const token = parse(tokenCookie).value;
    try {
      socket['user'] = this.jwtService.verify<JwtPayload>(token);
    } catch (e) {
      throw new UnauthorizedException((e as Error).message);
    }

    return true;
  }
}
