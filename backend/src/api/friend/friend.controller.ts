import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'common/database/entities/user.entity';
import { ReqUser } from 'common/auth/jwt-auth';
import { UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { ApiCookieAuth } from '@nestjs/swagger';
import { FindFriendService } from './service/find-friend.service';
import { AddFriendService } from './service/add-friend.service';
import { recvFriendRequestDto } from './dto/request/recv-friend.dto';
import { DeleteFriendService } from './service/delete-friend.service';
import { Friend } from 'common/database/entities/friend.entity';

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
    return await this.findFriendService.findAllFriendsByUserId(id);
  }

  @Post()
  @ApiOperation({ summary: '친구 추가 (친구 / 차단)' })
  @ApiOkResponse({ description: '친구 추가 성공', type: recvFriendRequestDto })
  async addFriend(
    @ReqUser() { id } : User,
    @Body() recvDto: recvFriendRequestDto
    ): Promise<recvFriendRequestDto> {
      return await this.addFriendService.addFriendByFriendId(id, recvDto);
    }

  @Delete()
  @ApiOperation({ summary: '친구 삭제 (친구 / 차단)' })
  @ApiOkResponse({ description: '친구 삭제 성공', type: recvFriendRequestDto })
  async deleteFriend(
    @ReqUser() { id } : User,
    @Body() recvDto: recvFriendRequestDto
    ): Promise<recvFriendRequestDto> {
      return await this.deleteFriendService.deleteFriendByFriendId(id, recvDto);
    }
}