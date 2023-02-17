import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';

@Injectable()
export class CookieService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly configService: ConfigService,
  ) {}

  getCookieOption(): CookieOptions {
    const oneHour = 60 * 60 * 1000;
    const maxAge = 7 * 24 * oneHour; // 7days

    return this.configService.get('PROFILE') === 'production' //
      ? { secure: true, sameSite: 'none', maxAge }
      : { maxAge };
  }

  createJwt<T extends Record<string, string | number>>(payload: T): string {
    return this.jwtService.sign(payload);
  }
}
