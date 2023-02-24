import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Achievement } from 'common/database/entities/achievement.entity';
import { GetAllAchievementService } from './services/get-all-achievement.service';
import { GetUserAchievementService } from './services/get-user-achievement.service';
import { UpdateUserAchievementService } from './services/update-user-achievement.service';

@ApiTags('Achievement')
@Controller('achievement')
export class AchievementController {
  constructor(
    private readonly getAllAchievementService: GetAllAchievementService,
    private readonly getUserAchievementService: GetUserAchievementService,
    private readonly updateUserAchievementService: UpdateUserAchievementService,
  ) {}

  @Get()
  @ApiOperation({ summary: '업적 목록 가져오기' })
  @ApiOkResponse({ description: '업적 목록', type: Achievement, isArray: true })
  async all(): Promise<Achievement[]> {
    return await this.getAllAchievementService.getAllAchievement();
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 업적 목록 가져오기' })
  @ApiOkResponse({ description: '유저 업적 목록', type: Achievement, isArray: true })
  async userAchievements(@Param('id', ParseIntPipe) id: number): Promise<Achievement[]> {
    return await this.getUserAchievementService.getUserAchievementById(id);
  }

  @Post(':id')
  @ApiOperation({ summary: '유저 업적 업데이트' })
  @ApiOkResponse({ description: '업적 업데이트 성공' })
  async update(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.updateUserAchievementService.updateAchievement(id);
  }
}
