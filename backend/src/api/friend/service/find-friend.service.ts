import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { User } from '../../../common/database/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FindFriendService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async findAllFriendsByUserId(senderId: number): Promise<User[]> {
    const friends = await this.friendRepository.find({
      where: { sendFriendRequestUserId: senderId },
    });
    const friendIds = friends.map(friend => friend.recvFriendRequestUserId && friend.status === 'FRIEND' ? friend.recvFriendRequestUserId : null);

    return this.userRepository.findByIds(friendIds);
  }

  async findFriendByIdOrFail(senderId: number, friendId: number): Promise<Friend> {
    const friend = await this.friendRepository.findOne({
      where: { sendFriendRequestUserId: senderId, recvFriendRequestUserId: friendId },
    });
    if (!friend) {
      throw new NotFoundException(`Friend with id ${friendId} not found`);
    }
    return friend;
  }
}