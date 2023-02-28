import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FtProfile } from '../../../common/auth/types';

@Injectable()
export class FtJwtAuthStrategy extends PassportStrategy(Strategy, 'ft-jwt-auth') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request.cookies['ft_profile']]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: FtProfile, done: (err: unknown, data: FtProfile) => void): Promise<void> {
    if (!payload.id || !payload.username || !payload.image_url || !payload.email) {
      throw new UnauthorizedException('Invalid ftProfile token');
    }

    done(null, payload);
  }
}
