import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { recvFriendRequestDto } from '../dto/request/recv-friend.dto';
import { FindFriendService } from './find-friend.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AddFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly findFriendService: FindFriendService,
  ) {}

  async addFriendByFriendId(userid: number, recvFriendRequestDto: recvFriendRequestDto): Promise<recvFriendRequestDto> {
    const friend = await this.findFriendService.findFriendByIdOrFail(userid, recvFriendRequestDto.recvFriendRequestUserId);
    if (friend) {
      throw new BadRequestException (`이미 친구입니다.`);
    }
    await this.friendRepository.save({
      sendFriendRequestUserId: userid,
      ...recvFriendRequestDto,
    });
    return recvFriendRequestDto;
  }
}