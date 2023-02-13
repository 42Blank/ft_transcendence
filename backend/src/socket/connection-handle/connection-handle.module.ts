import { Module } from '@nestjs/common';
import { SocketJwtAuthModule } from '../../common/auth/socket-jwt-auth';
import { ConnectionHandleService } from './connection-handle.service';

@Module({
  imports: [SocketJwtAuthModule],
  providers: [ConnectionHandleService],
  exports: [ConnectionHandleService],
})
export class ConnectionHandleModule {}
