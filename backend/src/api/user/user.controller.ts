import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReqUser, UserJwtAuthGuard } from '../../common/auth/jwt-auth';
import { User } from '../../common/database/entities/user.entity';
import { UpdateUserProfileRequestDto } from './dto/request/update-user-profile.dto';
import { FindUserService } from './service/find-user.service';
import { UpdateProfileService } from './service/update-profile.service';

@ApiTags('User')
@Controller('users')
@ApiCookieAuth()
@UseGuards(UserJwtAuthGuard)
@ApiUnauthorizedResponse({ description: '로그인이 필요합니다.' })
export class UserController {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly updateProfileService: UpdateProfileService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 가져오기' })
  @ApiOkResponse({ description: '모든 유저 정보', type: User, isArray: true })
  async all(): Promise<User[]> {
    return await this.findUserService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiOkResponse({ description: '내 정보', type: User })
  async me(@ReqUser() { id }: User): Promise<User> {
    return await this.findUserService.findOneByIdOrFail(id);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 유저 정보 가져오기' })
  @ApiOkResponse({ description: '유저 정보', type: User })
  @ApiBadRequestResponse({ description: '없는 유저' })
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.findUserService.findOneByIdOrFail(id);
  }

  @Put()
  @ApiOperation({ summary: '유저 프로필 변경' })
  @ApiOkResponse({ description: '성공' })
  async update(
    @ReqUser() user: User, //
    @Body() updateUserProfileDto: UpdateUserProfileRequestDto,
  ): Promise<void> {
    await this.updateProfileService.updateProfile(user, updateUserProfileDto);
  }
}
