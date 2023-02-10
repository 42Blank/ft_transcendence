import { Module } from '@nestjs/common';
import { SocketJwtAuthModule } from './auth';

import { ConnectionHandleGateWay } from './connection-handle.gateway';

@Module({
  imports: [SocketJwtAuthModule],
  providers: [ConnectionHandleGateWay],
  exports: [ConnectionHandleGateWay],
})
export class ConnectionHandleModule {}
