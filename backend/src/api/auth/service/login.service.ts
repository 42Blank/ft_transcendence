import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CookieOptions } from 'express';
import { Repository } from 'typeorm';
import { FtProfile } from '../../../common/auth/ft-auth';
import { JwtPayload } from '../../../common/auth/jwt-auth';
import { User } from '../../../common/database/entities/user.entity';

type Cookie = {
  name: string;
  value: string;
  option: CookieOptions;
};

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(ftProfile: FtProfile): Promise<Cookie> {
    let user = await this.userRepository.findOne({
      where: { intraId: ftProfile.id },
    });

    if (!user) {
      user = await this.userRepository.save({
        intraId: ftProfile.id,
        nickname: ftProfile.username,
        avatar: ftProfile.image_url,
      });
    }

    return {
      name: 'access_token',
      value: await this.createJwt(user.id),
      option: this.getCookieOption(),
    };
  }

  getCookieOption(): CookieOptions {
    const oneHour = 60 * 60 * 1000;
    const maxAge = 7 * 24 * oneHour; // 7days

    return this.configService.get('PROFILE') === 'production' //
      ? { secure: true, sameSite: 'none', maxAge }
      : { maxAge };
  }

  async createJwt(userId: number): Promise<string> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const payload: JwtPayload = {
      id: user.id,
      intraId: user.intraId,
    };

    return this.jwtService.sign(payload);
  }
}
