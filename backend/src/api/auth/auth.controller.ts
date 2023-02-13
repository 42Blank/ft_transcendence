import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Res, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FtProfile, ReqFtProfile } from '../../common/auth/ft-auth';
import { FtAuthGuard } from '../../common/auth/ft-auth/ft-auth.guard';
import { JwtAuthGuard } from '../../common/auth/jwt-auth';
import { LoginService } from './service/login.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Get('ft')
  @UseGuards(FtAuthGuard)
  @ApiOperation({ summary: '42 로그인', description: '42 로그인 페이지로 리다이렉트' })
  @ApiOkResponse({ description: '42 페이지' })
  ftLogin(): void {
    return;
  }

  @Get('ft/callback')
  @UseGuards(FtAuthGuard)
  @ApiOperation({ summary: '42 로그인 콜백' })
  @ApiOkResponse({ description: '로그인 성공' })
  async ftCallback(
    @ReqFtProfile() ftProfile: FtProfile,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const jwt = await this.loginService.login(ftProfile);
    const cookieOption = this.loginService.getCookieOption();

    response.cookie('access_token', jwt, cookieOption);
  }

  @Delete('signout')
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그아웃' })
  @ApiOkResponse({ description: '로그아웃 성공' })
  @ApiUnauthorizedResponse({ description: '로그인이 필요합니다.' })
  signout(@Res({ passthrough: true }) response: Response): void {
    const cookieOption = this.loginService.getCookieOption();

    response.clearCookie('access_token', cookieOption);
  }

  @Patch('debug/login/as/:id')
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '다른사람으로 로그인하기 (개발용입니다.)' })
  @ApiOkResponse({ description: '로그인 성공' })
  async getJwt(
    @Param('id', ParseIntPipe) id: number, //
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const jwt = await this.loginService.createJwt(id);
    const cookieOption = this.loginService.getCookieOption();

    response.cookie('access_token', jwt, cookieOption);
  }
}
