import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserJwtPayload } from '../../../common/auth/types';
import { User } from '../../../common/database/entities/user.entity';

@Injectable()
export class UserJwtAuthStrategy extends PassportStrategy(Strategy, 'user-jwt-auth') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request.cookies['access_token']]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: UserJwtPayload, done: (err: unknown, data: User) => void): Promise<void> {
    if (!payload.id || !payload.intraId) {
      throw new UnauthorizedException('Invalid JwtPyaload token');
    }

    const user = await this.userRepository.findOne({ where: { id: payload.id, intraId: payload.intraId } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    done(null, user);
  }
}
