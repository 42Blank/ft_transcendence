import { Module } from '@nestjs/common';
import { AchievementModule } from './achievement/achievement.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { FriendModule } from './friend/friend.module';
import { MatchHistoryModule } from './match_history/match-history.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, FriendModule, MatchHistoryModule, AchievementModule, FileModule],
})
export class ApiModule {}
