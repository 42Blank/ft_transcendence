import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ReqFtProfile } from '../../common/auth/ft-auth';
import { FtAuthGuard } from '../../common/auth/ft-auth/ft-auth.guard';
import { FtJwtAuthGuard, ReqJwtFtProfile } from '../../common/auth/jwt-auth';
import { FtProfile, UserJwtPayload } from '../../common/auth/types';
import { User } from '../../common/database/entities/user.entity';
import { RegisterRequestDto } from './dto/request/register.dto';
import { FtProfileDto } from './dto/response/ft-profile.dto';
import { CookieService } from './service/cookie.service';
import { LoginService } from './service/login.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly cookieService: CookieService, //
    private readonly loginService: LoginService,
  ) {}

  @Get('ft')
  @UseGuards(FtAuthGuard)
  @ApiOperation({
    summary: '42 로그인',
    description: "42 로그인 페이지로 리다이렉트 <a href='/auth/ft'> Please cmd + click me! </a>",
  })
  @ApiOkResponse({ description: '42 페이지' })
  ftLogin(): void {
    return;
  }

  @Get('ft/callback')
  @UseGuards(FtAuthGuard)
  @ApiOperation({ summary: '42 로그인 콜백' })
  @ApiOkResponse({ description: '로그인 성공', type: FtProfileDto })
  async ftCallback(
    @ReqFtProfile() ftProfile: FtProfile,
    @Res({ passthrough: true }) response: Response,
  ): Promise<FtProfileDto> {
    const jwt = this.cookieService.createJwt<FtProfile>(ftProfile);
    const cookieOption = this.cookieService.getCookieOption();

    response.cookie('ft_profile', jwt, cookieOption);

    return {
      id: ftProfile.id,
      username: ftProfile.username,
      image_url: ftProfile.image_url,
    };
  }

  @Get('ft/random')
  @ApiOperation({ summary: '42 랜덤하게 로그인하기 (개발용입니다.)' })
  @ApiOkResponse({ description: '로그인 성공' })
  async getJwt(@Res({ passthrough: true }) response: Response): Promise<void> {
    const randomId = String(Math.floor(Math.random() * 10000));
    const ftProfile = {
      id: `Z${randomId}`,
      username: `Pochita${randomId}`,
      image_url: 'https://beebom.com/wp-content/uploads/2022/10/Cute-Weakened-form-of-Pochita.jpg?w=640',
    };
    const jwt = this.cookieService.createJwt<FtProfile>(ftProfile);
    const cookieOption = this.cookieService.getCookieOption();

    response.cookie('ft_profile', jwt, cookieOption);
  }

  @Get('login')
  @UseGuards(FtJwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: '로그인 하기 (42인증 후에 진행해주세요)' })
  @ApiOkResponse({ description: '로그인 성공', type: User })
  async login(
    @ReqJwtFtProfile() ftProfile: FtProfile, //
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = await this.loginService.login(ftProfile);
    const jwt = this.cookieService.createJwt<UserJwtPayload>({
      id: user.id,
      intraId: user.intraId,
    });
    const cookieOption = this.cookieService.getCookieOption();

    response.cookie('access_token', jwt, cookieOption);

    return user;
  }

  @Post('register')
  @UseGuards(FtJwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: '회원가입 하기 (42인증 후에 진행해주세요)' })
  @ApiOkResponse({ description: '회원가입 성공', type: User })
  async register(
    @ReqJwtFtProfile() ftProfile: FtProfile, //
    @Body() registerDto: RegisterRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const user = await this.loginService.register(ftProfile, registerDto);
    const jwt = this.cookieService.createJwt<UserJwtPayload>({
      id: user.id,
      intraId: user.intraId,
    });
    const cookieOption = this.cookieService.getCookieOption();

    response.cookie('access_token', jwt, cookieOption);

    return user;
  }

  @Delete('signout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiOkResponse({ description: '로그아웃 성공' })
  signout(@Res({ passthrough: true }) response: Response): void {
    const cookieOption = this.cookieService.getCookieOption();

    response.clearCookie('access_token', cookieOption);
    response.clearCookie('ft_profile', cookieOption);
  }
}
