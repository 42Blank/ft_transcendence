import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { CreateFriendRequestDto } from '../dto/request/create-friend.dto';

@Injectable()
export class AddFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async addFriendByFriendId(userid: number, createFriendRequestDto: CreateFriendRequestDto): Promise<void> {
    await this.friendRepository.save({
      sendFriendRequestUserId: userid,
      ...createFriendRequestDto,
    });
  }
}