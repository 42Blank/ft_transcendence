import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { FriendModule } from './friend/friend.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, FriendModule, FileModule],
})
export class ApiModule {}
