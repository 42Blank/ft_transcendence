import { Injectable } from '@nestjs/common';
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
  ) {}

  async login(ftProfile: FtProfile): Promise<Cookie[]> {
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

    return this.createAuthCookie(user);
  }

  private createAuthCookie(user: User): Cookie[] {
    const name = 'access_token';
    const payload: JwtPayload = {
      id: user.id,
    };
    const oneHour = 60 * 60 * 1000;
    const maxAge = 7 * 24 * oneHour; // 7days

    return [
      {
        name,
        value: this.jwtService.sign(payload),
        option: { maxAge, domain: 'localhost' },
      },
      {
        name,
        value: this.jwtService.sign(payload),
        option: { maxAge },
      },
    ];
  }
}
