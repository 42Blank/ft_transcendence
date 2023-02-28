import { Module } from '@nestjs/common';
import { SocketRepositoryModule } from '../../common/database/repository';
import { ConnectionHandleModule } from '../connection-handle';
import { OnlineGateway } from './online.gateway';
import { OnlineUserService } from './service/online-user.service';

@Module({
  imports: [ConnectionHandleModule, SocketRepositoryModule],
  providers: [OnlineUserService, OnlineGateway],
  exports: [OnlineGateway], // Fix me
})
export class OnlineModule {}
