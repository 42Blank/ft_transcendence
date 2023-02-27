import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FtProfile } from '../../../common/auth/types';
import { User } from '../../../common/database/entities/user.entity';
import { pwCompare, pwEncryption } from '../../../common/utils';
import MailService from '../mail/mail.service';

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: User): Promise<void> {
    if (user.isTwoFactorAuth) {
      throw new ForbiddenException('이미 2FA가 활성화 되어있습니다.');
    }

    await this.userRepository.save({
      ...user,
      isTwoFactorAuth: true,
    });
  }

  async signin(user: User, ftProfile: FtProfile): Promise<void> {
    if (!user.isTwoFactorAuth) {
      throw new ForbiddenException('2FA가 활성화 되어있지 않습니다.');
    }

    const code = this.createCode(user, ftProfile);
    await this.mailService.send(ftProfile.email, user.nickname, code);
  }

  async verify(user: User, ftProfile: FtProfile, code: string): Promise<void> {
    if (!user.isTwoFactorAuth) {
      throw new ForbiddenException('2FA가 활성화 되어있지 않습니다.');
    }

    if (!this.verifyCode(user, ftProfile, code)) {
      throw new ForbiddenException('인증코드가 일치하지 않습니다.');
    }

    await this.mailService.unsubscribe(ftProfile.email);
  }

  async remove(user: User): Promise<void> {
    if (!user.isTwoFactorAuth) {
      throw new ForbiddenException('2FA가 활성화 되어있지 않습니다.');
    }

    await this.userRepository.save({
      ...user,
      isTwoFactorAuth: false,
    });
  }

  private createCode(user: User, ftProfile: FtProfile): string {
    const code = pwEncryption(user.id + ftProfile.id);
    return this.jwtService.sign({ code });
  }

  private verifyCode(user: User, ftProfile: FtProfile, code: string): boolean {
    const payload = this.jwtService.verify(code);
    return pwCompare(user.id + ftProfile.id, payload.code);
  }
}
