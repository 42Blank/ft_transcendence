import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { recvFriendRequestDto } from '../dto/request/recv-friend.dto';
import { FindFriendService } from './find-friend.service';
import { BadRequestException } from '@nestjs/common';
import { FindUserService } from 'api/user/service/find-user.service';

@Injectable()
export class AddFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly findFriendService: FindFriendService,
    private readonly findUserService: FindUserService,
  ) {}

  async addFriendByFriendId(userid: number, recvFriendRequestDto: recvFriendRequestDto): Promise<recvFriendRequestDto> {
    if (userid === recvFriendRequestDto.recvFriendRequestUserId) {
      throw new BadRequestException (`자기 자신을 친구로 추가할 수 없습니다.`);
    }
    await this.findUserService.findOneByIdOrFail(recvFriendRequestDto.recvFriendRequestUserId);
    const isFriend = await this.findFriendService.findFriendById(userid, recvFriendRequestDto.recvFriendRequestUserId);
    if (!!isFriend) {
      throw new BadRequestException (`이미 친구입니다.`);
    }
    await this.friendRepository.save({
      sendFriendRequestUserId: userid,
      ...recvFriendRequestDto,
    });
    return recvFriendRequestDto;
  }
}