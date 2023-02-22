import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Achievement } from 'common/database/entities/achievement.entity';
import { GetAchievementService } from './services/get-achievement.service';

@ApiTags('Achievement')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly getAchievementService: GetAchievementService) {}

  @Get(':id')
  @ApiOperation({ summary: '유저 업적 목록 가져오기' })
  @ApiOkResponse({ description: '유저 업적 목록', type: Achievement, isArray: true })
  async all(@Param('id', ParseIntPipe) id: number): Promise<Achievement[]> {
    return await this.getAchievementService.getAchievement(id);
  }
}
