import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { UpdateUserProfileRequestDto } from '../dto/request/update-user-profile.dto';

@Injectable()
export class UpdateProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateProfile(user: User, updateUserProfileDto: UpdateUserProfileRequestDto): Promise<void> {
    const isNicknameAlreadyUsed = await this.isNicknameAlreadyUsed(user.nickname, updateUserProfileDto.nickname);
    if (isNicknameAlreadyUsed) {
      throw new BadRequestException(`${updateUserProfileDto.nickname} 는 이미 사용중인 닉네임입니다.`);
    }

    await this.userRepository.save({
      ...user,
      ...updateUserProfileDto,
    });
  }

  private async isNicknameAlreadyUsed(oldNick: string, newNick: string | undefined): Promise<boolean> {
    if (!newNick) {
      return false;
    }

    if (oldNick === newNick) {
      return false;
    }

    const alreadyUsedNickname = await this.userRepository.findOne({
      where: { nickname: newNick },
    });

    return !!alreadyUsedNickname;
  }
}
