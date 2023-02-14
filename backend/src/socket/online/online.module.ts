import { Module } from '@nestjs/common';
import { ConnectionHandleModule } from '../connection-handle';
import { OnlineGateway } from './online.gateway';
import { OnlineUserRepository } from './repository/online-user.repository';
import { OnlineUserService } from './service/online-user.service';

@Module({
  imports: [ConnectionHandleModule],
  providers: [OnlineUserRepository, OnlineUserService, OnlineGateway],
})
export class OnlineModule {}
