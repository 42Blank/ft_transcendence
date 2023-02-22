import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReqUser, UserJwtAuthGuard } from 'common/auth/jwt-auth';
import { Achievement } from 'common/database/entities/achievement.entity';
import { User } from 'common/database/entities/user.entity';
import { GetAchievementService } from './services/get-achievement.service';

@ApiTags('Achievement')
@Controller('achievement')
@UseGuards(UserJwtAuthGuard)
export class AchievementController {
  constructor(private readonly getAchievementService: GetAchievementService) {}

  @Get()
  @ApiOperation({ summary: '업적 목록 가져오기' })
  @ApiOkResponse({ description: '내 업적 목록', type: Achievement, isArray: true })
  async all(@ReqUser() { id }: User): Promise<Achievement[]> {
    return await this.getAchievementService.getAchievement(id);
  }
}
