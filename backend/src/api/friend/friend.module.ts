import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUserService } from 'api/user/service/find-user.service';
import { Friend } from '../../common/database/entities/friend.entity';
import { User } from '../../common/database/entities/user.entity';
import { FriendController } from './friend.controller';
import { AddFriendService } from './service/add-friend.service';
import { FindFriendService } from './service/find-friend.service';
import { DeleteFriendService } from './service/delete-friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friend])],
  providers: [FindFriendService, AddFriendService, FindUserService, DeleteFriendService],
  controllers: [FriendController],
})

export class FriendModule {}
