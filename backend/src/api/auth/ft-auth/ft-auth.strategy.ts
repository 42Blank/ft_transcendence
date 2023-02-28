import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { FtProfile } from '../../../common/auth/types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const FortyTwoPassport = require('passport-42');

@Injectable()
export class FtAuthStrategy extends PassportStrategy(FortyTwoPassport.Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('FT_CLIENT_ID'),
      clientSecret: configService.getOrThrow('FT_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('FT_CALLBACK_URL'),
      profileFields: {
        id: (obj: { id: number }) => String(obj.id),
        username: 'login',
        image_url: 'image.link',
        email: 'email',
      },
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Record<string, string>,
    done: (err: unknown, data: FtProfile) => void,
  ): Promise<void> {
    done(null, {
      id: profile.id,
      username: profile.username,
      image_url: profile.image_url,
      email: profile.email,
    });
  }
}
