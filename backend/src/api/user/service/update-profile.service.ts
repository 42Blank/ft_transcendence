import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { UpdateUserProfileRequestDto } from '../dto/update-user-profile-request.dto';

@Injectable()
export class UpdateProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateProfile(user: User, updateUserProfileDto: UpdateUserProfileRequestDto): Promise<void> {
    await this.userRepository.save({
      ...user,
      ...updateUserProfileDto,
    });
  }
}
