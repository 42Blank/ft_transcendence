import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  async updateTwoFactor(user: User): Promise<void> {
    if (user.isTwoFactorAuth) {
      throw new ForbiddenException('이미 2FA가 활성화 되어있습니다.');
    }

    await this.userRepository.save({
      ...user,
      isTwoFactorAuth: true,
    });
  }
}
