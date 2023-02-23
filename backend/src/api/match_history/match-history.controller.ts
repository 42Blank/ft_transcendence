import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { MatchHistoryRequestDto } from './request/match-result-request.dto';
import { AddUserWinHistoryService } from './service/add-user-win.service';
import { GetAllMatchHistoryService } from './service/get-all-match-history.service';

@ApiTags('Match History')
@Controller('match')
@UseGuards(UserJwtAuthGuard)
export class MatchHistoryController {
  constructor(
    private readonly getAllMatchHistoryService: GetAllMatchHistoryService,
    private readonly addUserWinHistoryService: AddUserWinHistoryService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: '유저 일반 게임 목록 가져오기' })
  @ApiOkResponse({ description: '유저 일반 개임', type: MatchHistory, isArray: true })
  async all(@Param('id', ParseIntPipe) id: number): Promise<MatchHistoryRequestDto[]> {
    return await this.getAllMatchHistoryService.getAllMatch(id);
  }

  // 테스트용 api
  @Post('debug/:id')
  @ApiOperation({ summary: '(개발용) 유저 승리 추가. 더미 유저를 하나 이상 추가해주세요.' })
  @ApiOkResponse({ description: '성공 !' })
  async addWin(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.addUserWinHistoryService.addWin(id);
  }
}
