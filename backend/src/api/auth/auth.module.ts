import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/database/entities/user.entity';
import { AuthController } from './auth.controller';
import { FtAuthModule } from './ft-auth/ft-auth.module';
import { GithubAuthModule } from './github-auth/github-auth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import MailService from './mail/mail.service';
import { CookieService } from './service/cookie.service';
import { LoginService } from './service/login.service';
import { TwoFactorService } from './service/two-factor.service';

@Module({
  imports: [
    FtAuthModule,
    JwtAuthModule,
    GithubAuthModule,
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
  providers: [CookieService, LoginService, TwoFactorService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
