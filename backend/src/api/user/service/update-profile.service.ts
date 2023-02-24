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
    if (updateUserProfileDto.nickname) {
      const isNicknameAlreadyUsed = await this.isNicknameAlreadyUsed(updateUserProfileDto.nickname);
      if (isNicknameAlreadyUsed) {
        throw new BadRequestException(`${updateUserProfileDto.nickname} 는 이미 사용중인 닉네임입니다.`);
      }
    }

    await this.userRepository.save({
      ...user,
      ...updateUserProfileDto,
    });
  }

  async isNicknameAlreadyUsed(newNick: string): Promise<boolean> {
    const alreadyUsedNickname = await this.userRepository.findOne({
      where: { nickname: newNick },
    });

    return !!alreadyUsedNickname;
  }
}
