import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FtAuthStrategy } from './ft-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [FtAuthStrategy],
})
export class FtAuthModule {}
