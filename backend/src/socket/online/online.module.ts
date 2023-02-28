import { Module } from '@nestjs/common';
import { OnlineUserRepository } from '../../common/database/repository';
import { ConnectionHandleModule } from '../connection-handle';
import { OnlineGateway } from './online.gateway';
import { OnlineUserService } from './service/online-user.service';

@Module({
  imports: [ConnectionHandleModule],
  providers: [OnlineUserRepository, OnlineUserService, OnlineGateway],
})
export class OnlineModule {}
