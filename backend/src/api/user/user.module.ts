import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { FindUserService } from './service/find-user.service';
import { UpdateProfileService } from './service/update-profile.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UpdateProfileService, FindUserService],
  controllers: [UserController],
})
export class UserModule {}
