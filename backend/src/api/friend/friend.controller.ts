import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'common/database/entities/user.entity';
import { ReqUser } from 'common/auth/jwt-auth';
import { UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { ApiCookieAuth } from '@nestjs/swagger';
import { FindFriendService } from './service/find-friend.service';
import { AddFriendService } from './service/add-friend.service';
import { CreateFriendRequestDto } from './dto/request/create-friend.dto';

@ApiTags('Friend')
@Controller('friend')
@ApiCookieAuth()
@UseGuards(UserJwtAuthGuard)
export class FriendController {
  constructor(
    private readonly findFriendService: FindFriendService,
    private readonly addFriendService: AddFriendService,
  ) {}

  @Get()
  @ApiOperation({ summary: '친구 목록 가져오기' })
  @ApiOkResponse({ description: '내 친구 목록', type: User, isArray: true})
  async all(@ReqUser() { id }: User): Promise<User[]> {
    return await this.findFriendService.findAllFriendsByUserId(id);
  }

  @Post()
  @ApiOperation({ summary: '친구 추가 (친구 / 차단)' })
  async addFriend(
    @ReqUser() { id } : User,
    @Body() createFriendRequestDto: CreateFriendRequestDto
    ): Promise<void> {
    return await this.addFriendService.addFriendByFriendId(id, createFriendRequestDto);
  }
}