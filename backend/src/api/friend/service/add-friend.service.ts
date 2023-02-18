import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { User } from '../../../common/database/entities/user.entity';
import { FriendRequestDto } from '../dto/request/friend-request.dto';

@Injectable()
export class AddFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addFriendByReceiverId(userid: number, recvFriendRequestDto: FriendRequestDto): Promise<void> {
    if (userid === recvFriendRequestDto.recvFriendRequestUserId) {
      throw new BadRequestException(`자기 자신을 친구로 추가할 수 없습니다.`);
    }
    if (
      (await this.userRepository.findOne({ where: { id: recvFriendRequestDto.recvFriendRequestUserId } })) === undefined
    ) {
      throw new BadRequestException(`존재하지 않는 사용자입니다.`);
    }
    if (
      (await this.friendRepository.findOne({
        where: {
          sendFriendRequestUserId: userid,
          recvFriendRequestUserId: recvFriendRequestDto.recvFriendRequestUserId,
        },
      })) !== undefined
    ) {
      throw new BadRequestException(`이미 친구 요청을 보냈습니다.`);
    }
    await this.friendRepository.save({
      sendFriendRequestUserId: userid,
      ...recvFriendRequestDto,
    });
  }
}
