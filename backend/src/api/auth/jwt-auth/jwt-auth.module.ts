import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../common/database/entities/user.entity';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [JwtAuthStrategy],
})
export class JwtAuthModule {}
