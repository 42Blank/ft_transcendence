import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend, FriendStatus } from '../../../common/database/entities/friend.entity';
import { User } from '../../../common/database/entities/user.entity';

@Injectable()
export class FindFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async findAllFriendsbyStatus(senderId: number, status: FriendStatus): Promise<User[]> {
    const friends = await this.friendRepository.find({
      where: {
        sendFriendRequestUserId: senderId,
        status: status,
      },
      relations: ['recvFriendRequestUser'],
    });
    return friends.map(friend => friend.recvFriendRequestUser);
  }
}
