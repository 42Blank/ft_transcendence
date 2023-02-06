import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [JwtAuthStrategy],
})
export class JwtAuthModule {}
