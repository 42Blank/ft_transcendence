import { Module } from '@nestjs/common';
import { SocketJwtAuthModule } from './auth';

import { ConnectionHandleService } from './connection-handle.service';

@Module({
  imports: [SocketJwtAuthModule],
  providers: [ConnectionHandleService],
  exports: [ConnectionHandleService],
})
export class ConnectionHandleModule {}
