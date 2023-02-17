import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'common/database/entities/user.entity';
import { ReqUser } from 'common/auth/jwt-auth';
import { Friend } from 'common/database/entities/friend.entity';
import { FindFriendService } from './service/find-friend.service';

@ApiTags('Friend')
@Controller('friend')
export class FriendController {
  constructor(
    private readonly findFriendService: FindFriendService,
  ) {}

  @Get()
  @ApiOperation({ summary: '친구 목록 가져오기' })
  @ApiOkResponse({ description: '내 친구 목록', type: User, isArray: true})
  async all(@ReqUser() { id }: User): Promise<User[]> {
    return await this.findFriendService.findAllFriendsByUserId(id);
  }

  // @Post()
  // @ApiOperation({ summary: '친구 추가' })
  // async addFriend() {

  // }

  // @Delete()
  // deleteFriend() {
  // }
}