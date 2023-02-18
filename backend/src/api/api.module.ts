import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [UserModule, AuthModule, FriendModule],
})
export class ApiModule {}
