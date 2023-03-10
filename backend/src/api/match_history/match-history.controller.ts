import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { MatchHistoryResponseDto } from './response/match-result-response.dto';
import { AddUserWinHistoryService } from './service/add-user-win.service';
import { GetAllMatchHistoryService } from './service/get-all-match-history.service';
import { GetMatchHistoryService } from './service/get-match-history.service';

@ApiTags('Match History')
@Controller('match')
@UseGuards(UserJwtAuthGuard)
export class MatchHistoryController {
  constructor(
    private readonly getAllMatchHistoryService: GetAllMatchHistoryService,
    private readonly getMatchHistoryService: GetMatchHistoryService,
    private readonly addUserWinHistoryService: AddUserWinHistoryService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: '게임 정보 가져오기' })
  @ApiOkResponse({ description: '게임 정보', type: MatchHistoryResponseDto })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<MatchHistoryResponseDto> {
    const matchHistory = await this.getMatchHistoryService.getMatchById(id);

    return {
      id: matchHistory.id,
      winner: matchHistory.winner,
      loser: matchHistory.loser,
      createdAt: matchHistory.createdAt,
    };
  }

  @Get('by/user/:id')
  @ApiOperation({ summary: '유저 일반 게임 목록 가져오기' })
  @ApiOkResponse({ description: '유저 일반 개임', type: MatchHistoryResponseDto, isArray: true })
  async all(@Param('id', ParseIntPipe) id: number): Promise<MatchHistoryResponseDto[]> {
    const matchHistories = await this.getAllMatchHistoryService.getAllMatch(id);

    return matchHistories.map(matchHistory => {
      return {
        id: matchHistory.id,
        winner: matchHistory.winner,
        loser: matchHistory.loser,
        createdAt: matchHistory.createdAt,
      };
    });
  }

  // 테스트용 api
  @Post('debug/:id')
  @ApiOperation({ summary: '(개발용) 유저 승리 추가. 더미 유저를 하나 이상 추가해주세요.' })
  @ApiOkResponse({ description: '성공 !' })
  async addWin(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.addUserWinHistoryService.addWin(id);
  }
}
