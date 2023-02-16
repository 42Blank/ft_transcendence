import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { parse } from 'tough-cookie';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { UserJwtPayload } from '../types';

@Injectable()
export class SocketJwtAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly jwtService: JwtService,
  ) {}

  async verify(socket: Socket & { user?: UserJwtPayload }): Promise<boolean> {
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) {
      throw new UnauthorizedException('No cookie provided');
    }

    const tokenCookie = cookie
      .split(';')
      .map(v => v.trim())
      .find(v => v.startsWith('access_token='));

    if (!tokenCookie) {
      throw new UnauthorizedException('No token provided');
    }

    const token = parse(tokenCookie).value;
    try {
      const payload = this.jwtService.verify<UserJwtPayload>(token);

      if (!payload.id || !payload.intraId) {
        throw new UnauthorizedException('Invalid token');
      }

      const user = await this.userRepository.findOne({ where: { id: payload.id, intraId: payload.intraId } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      socket.user = user;
    } catch (e) {
      throw new UnauthorizedException((e as Error).message);
    }

    return true;
  }
}
