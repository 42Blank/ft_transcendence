import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from '../../../common/database/entities/friend.entity';
import { DeleteFriendRequestDto } from '../dto/request/delete-friend-request.dto';

@Injectable()
export class DeleteFriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async deletebyId(userid: number, deleteDto: DeleteFriendRequestDto): Promise<void> {
    await this.friendRepository.delete({
      sendFriendRequestUserId: userid,
      recvFriendRequestUserId: deleteDto.recvFriendRequestUserId,
    });
  }
}
