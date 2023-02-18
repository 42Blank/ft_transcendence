import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Friend } from "../../../common/database/entities/friend.entity";
import { recvFriendRequestDto } from "../dto/request/recv-friend.dto";
import { FindFriendService } from "./find-friend.service";

@Injectable()
export class DeleteFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly findFriendService: FindFriendService,
  ) {}

  async deleteFriendByFriendId(userid: number, recvDto: recvFriendRequestDto): Promise<recvFriendRequestDto> {
    const friend = await this.findFriendService.findFriendByIdOrFail(userid, recvDto.recvFriendRequestUserId);

    if (!friend) {
      throw new BadRequestException (`친구/차단(이)가 아닙니다.`);
    }
    await this.friendRepository.remove(friend);   
    return recvDto;
  }
}