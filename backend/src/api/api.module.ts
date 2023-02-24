import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { MatchHistoryModule } from './match_history/match-history.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, FriendModule, MatchHistoryModule],
})
export class ApiModule {}
