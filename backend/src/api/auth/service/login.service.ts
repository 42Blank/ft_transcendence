import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CookieOptions } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { FtProfile } from '../../../common/guard/ft-auth';
import { JwtPayload } from '../../../common/guard/jwt-auth';

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
      value: await this.getJwt(user.id),
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

  async getJwt(userId: number): Promise<string> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const payload: JwtPayload = {
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
