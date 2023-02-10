import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { parse } from 'tough-cookie';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class SocketJwtAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly jwtService: JwtService,
  ) {}

  async guard(socket: Socket): Promise<boolean> {
    const tokenCookie = socket.handshake.headers.cookie
      .split(';')
      .map(v => v.trim())
      .find(v => v.startsWith('access_token='));

    if (!tokenCookie) {
      throw new UnauthorizedException('No token provided');
    }

    const token = parse(tokenCookie).value;
    try {
      const jwtPayload = this.jwtService.verify<JwtPayload>(token);

      const user = await this.userRepository.findOne({ where: { id: jwtPayload.id, intraId: jwtPayload.intraId } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      (socket as Socket & { user: JwtPayload }).user = user;
    } catch (e) {
      throw new UnauthorizedException((e as Error).message);
    }

    return true;
  }
}
