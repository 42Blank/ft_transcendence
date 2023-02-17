import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { User } from '../../../common/database/entities/user.entity';

@Injectable()
export class FindFriendService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async findAllFriendsByUserId(sendFriendRequestUserId: number): Promise<User[]> {
    const friends = await this.friendRepository.find({
      where: { sendFriendRequestUserId },
    });
    const friendIds = friends.map(friend => friend.recvFriendRequestUserId && friend.status === 'FRIEND' ? friend.recvFriendRequestUserId : null);

    return this.userRepository.findByIds(friendIds);
  }
}