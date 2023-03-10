import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser, UserJwtAuthGuard } from '../../common/auth/jwt-auth';
import { User } from '../../common/database/entities/user.entity';
import { CheckDuplicateNicknameDto } from './dto/request/check-duplicate-nickname.dto';
import { UpdateUserProfileRequestDto } from './dto/request/update-user-profile.dto';
import { FindUserService } from './service/find-user.service';
import { UpdateProfileService } from './service/update-profile.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly findUserService: FindUserService,
    private readonly updateProfileService: UpdateProfileService,
  ) {}

  @Get()
  @ApiCookieAuth()
  @UseGuards(UserJwtAuthGuard)
  @ApiOperation({ summary: '모든 유저 가져오기' })
  @ApiOkResponse({ description: '모든 유저 정보', type: User, isArray: true })
  async all(): Promise<User[]> {
    return await this.findUserService.findAll();
  }

  @Get('me')
  @ApiCookieAuth()
  @UseGuards(UserJwtAuthGuard)
  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiOkResponse({ description: '내 정보', type: User })
  async me(@ReqUser() { id }: User): Promise<User> {
    return await this.findUserService.findOneByIdOrFail(id);
  }

  @Get(':id')
  @ApiCookieAuth()
  @UseGuards(UserJwtAuthGuard)
  @ApiOperation({ summary: '특정 유저 정보 가져오기' })
  @ApiOkResponse({ description: '유저 정보', type: User })
  @ApiBadRequestResponse({ description: '없는 유저' })
  async findOneById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.findUserService.findOneByIdOrFail(id);
  }

  @Put()
  @ApiCookieAuth()
  @UseGuards(UserJwtAuthGuard)
  @ApiOperation({ summary: '유저 프로필 변경' })
  @ApiOkResponse({ description: '성공' })
  async update(
    @ReqUser() user: User, //
    @Body() updateUserProfileDto: UpdateUserProfileRequestDto,
  ): Promise<void> {
    await this.updateProfileService.updateProfile(user, updateUserProfileDto);
  }

  @Post('check-duplicate-nickname')
  @ApiOperation({ summary: '중복 닉네임 있는지 확인' })
  @ApiOkResponse({ description: '중복 닉네임 여부' })
  async checkNickname(
    @Body() checkDuplicateNicknameDto: CheckDuplicateNicknameDto, //
  ): Promise<boolean> {
    return await this.updateProfileService.isNicknameAlreadyUsed(checkDuplicateNicknameDto.nickname);
  }
}
