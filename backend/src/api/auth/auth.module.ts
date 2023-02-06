import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { AuthController } from './auth.controller';
import { FtAuthModule } from './ft-auth/ft-auth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { LoginService } from './service/login.service';

@Module({
  imports: [
    FtAuthModule,
    JwtAuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [LoginService],
  controllers: [AuthController],
})
export class AuthModule {}