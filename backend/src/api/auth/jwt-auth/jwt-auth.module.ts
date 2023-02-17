import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { FtJwtAuthStrategy } from './ft-jwt-auth.strategy';
import { UserJwtAuthStrategy } from './user-jwt-auth.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [FtJwtAuthStrategy, UserJwtAuthStrategy],
})
export class JwtAuthModule {}
