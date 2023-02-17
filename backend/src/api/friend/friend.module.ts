import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from '../../common/database/entities/friend.entity';
import { User } from '../../common/database/entities/user.entity';
import { FriendController } from './friend.controller';
import { FindFriendService } from './service/find-friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friend])],
  providers: [FindFriendService],
  controllers: [FriendController],
})

export class FriendModule {}
