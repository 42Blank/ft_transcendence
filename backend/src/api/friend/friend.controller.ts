import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser, UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { FriendStatus } from 'common/database/entities/friend.entity';
import { User } from 'common/database/entities/user.entity';
import { DeleteFriendRequestDto } from './dto/request/delete-friend-request.dto';
import { FriendRequestDto } from './dto/request/friend-request.dto';
import { AddFriendService } from './service/add-friend.service';
import { DeleteFriendService } from './service/delete-friend.service';
import { FindFriendService } from './service/find-friend.service';

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
  @ApiOkResponse({ description: '내 친구 목록', type: User, isArray: true })
  async all(@ReqUser() { id }: User): Promise<User[]> {
    return await this.findFriendService.findAllFriendsbyStatus(id, FriendStatus.FRIEND);
  }

  @Get('block')
  @ApiOperation({ summary: '차단 목록 가져오기' })
  @ApiOkResponse({ description: '내 차단 목록', type: User, isArray: true })
  async blockUsers(@ReqUser() { id }: User): Promise<User[]> {
    return await this.findFriendService.findAllFriendsbyStatus(id, FriendStatus.BLOCK);
  }

  @Post()
  @ApiOperation({ summary: '친구 추가 (친구 / 차단)' })
  @ApiOkResponse({ description: '친구 추가 성공', type: FriendRequestDto })
  async addFriend(@ReqUser() { id }: User, @Body() recvDto: FriendRequestDto): Promise<void> {
    return await this.addFriendService.addFriendByReceiverId(id, recvDto);
  }

  @Delete()
  @ApiOperation({ summary: '친구 삭제 (친구 / 차단)' })
  @ApiOkResponse({ description: '친구 삭제 성공', type: DeleteFriendRequestDto })
  async deleteFriend(@ReqUser() { id }: User, @Body() recvDto: DeleteFriendRequestDto): Promise<void> {
    return await this.deleteFriendService.deletebyId(id, recvDto);
  }
}
