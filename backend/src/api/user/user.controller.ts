import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../../common/database/entities/user.entity';
import { JwtAuthGuard, JwtPayload, ReqJwtPayload } from '../../common/guard/jwt-auth';
import { UpdateUserProfileRequestDto } from './dto/update-user-profile-request.dto';
import { FindUserService } from './service/find-user.service';
import { UpdateProfileService } from './service/update-profile.service';

@ApiTags('User')
@Controller('users')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard)
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
  async me(@ReqJwtPayload() { id }: JwtPayload): Promise<User> {
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
    @ReqJwtPayload() user: User, //
    @Body() updateUserProfileDto: UpdateUserProfileRequestDto,
  ): Promise<void> {
    await this.updateProfileService.updateProfile(user, updateUserProfileDto);
  }
}
