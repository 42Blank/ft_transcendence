import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'common/database/entities/user.entity';
import { ReqUser } from 'common/auth/jwt-auth';
import { UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { FindFriendService } from './service/find-friend.service';
import { AddFriendService } from './service/add-friend.service';
import { FriendRequestDto } from './dto/request/friend-request.dto';
import { DeleteFriendService } from './service/delete-friend.service';
import { DeleteFriendRequestDto } from './dto/request/delete-friend-request.dto';

@ApiTags('Friend')
@Controller('friend')
@UseGuards(UserJwtAuthGuard)
export class FriendController {
  constructor(
    private readonly findFriendService: FindFriendService,
    private readonly addFriendService: AddFriendService,
    private readonly deleteFriendService: DeleteFriendService,
  ) {}

  @Get()
  @ApiOperation({ summary: '친구 목록 가져오기' })
  @ApiOkResponse({ description: '내 친구 목록', type: User, isArray: true})
  async all(@ReqUser() { id }: User): Promise<User[]> {
    return await this.findFriendService.findAllFriendsBySenderId(id);
  }

  @Post()
  @ApiOperation({ summary: '친구 추가 (친구 / 차단)' })
  @ApiOkResponse({ description: '친구 추가 성공', type: FriendRequestDto })
  async addFriend(
    @ReqUser() { id } : User,
    @Body() recvDto: FriendRequestDto
    ): Promise<void> {
      return await this.addFriendService.addFriendByReceiverId(id, recvDto);
    }

  @Delete()
  @ApiOperation({ summary: '친구 삭제 (친구 / 차단)' })
  @ApiOkResponse({ description: '친구 삭제 성공', type: DeleteFriendRequestDto })
  async deleteFriend(
    @ReqUser() { id } : User,
    @Body() recvDto: DeleteFriendRequestDto
    ): Promise<void> {
      return await this.deleteFriendService.deletebyId(id, recvDto);
    }
}