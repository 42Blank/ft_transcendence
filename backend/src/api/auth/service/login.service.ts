import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FtProfile } from '../../../common/auth/types';

import { User } from '../../../common/database/entities/user.entity';
import { RegisterRequestDto } from '../dto/request/register.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  async login(ftProfile: FtProfile): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { intraId: ftProfile.id },
    });

    if (!user) {
      throw new ForbiddenException('등록되지 않은 유저입니다.');
    }

    return user;
  }

  async isRegistered(ftProfile: FtProfile): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { intraId: ftProfile.id },
    });

    return !!user;
  }

  async register(ftProfile: FtProfile, registerDto: RegisterRequestDto): Promise<User> {
    const alreadyRegisteredUser = await this.userRepository.findOne({
      where: { intraId: ftProfile.id },
    });

    if (alreadyRegisteredUser) {
      throw new ForbiddenException('이미 등록된 유저입니다.');
    }

    const alreadyUsedNickname = await this.userRepository.findOne({
      where: { nickname: registerDto.nickname },
    });

    if (alreadyUsedNickname) {
      throw new BadRequestException(`${registerDto.nickname} 는 이미 사용중인 닉네임입니다.`);
    }

    const user = await this.userRepository.save({
      intraId: ftProfile.id,
      nickname: registerDto.nickname,
      avatar: registerDto.avatar,
    });

    return user;
  }
}
