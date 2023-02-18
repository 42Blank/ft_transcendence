import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { User } from '../../../common/database/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { FriendStatus } from '../../../common/database/entities/friend.entity';

@Injectable()
export class FindFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async findAllFriendsBySenderId(senderId: number): Promise<User[]> {
    const friends = await this.friendRepository.find({
      where: {
        sendFriendRequestUserId: senderId,
        status: FriendStatus.FRIEND,
      },
      relations: ['recvFriendRequestUser'],
    });
    return friends.map((friend) => friend.recvFriendRequestUser);
  }

  async findFriendById(senderId: number, friendId: number): Promise<Friend> {
    const friend = await this.friendRepository.findOne({
      where: { sendFriendRequestUserId: senderId, recvFriendRequestUserId: friendId },
    });
    return friend;
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