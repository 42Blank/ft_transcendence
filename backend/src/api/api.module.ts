import { Module } from '@nestjs/common';
import { MatchHistory } from 'common/database/entities/match-history.entity';
import { AuthModule } from './auth/auth.module';
import { FriendModule } from './friend/friend.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, FriendModule, MatchHistory],
})
export class ApiModule {}
