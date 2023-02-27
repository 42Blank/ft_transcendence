import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export default class MailService {
  constructor(private readonly configService: ConfigService) {}

  private accessToken = this.configService.get<string>('STIBEE_API_KEY');

  async send(email: string, name: string, code: string) {
    await this.subscribe(email, name);
    const url = this.configService.getOrThrow('STIBEE_MAIL_SEND_URL');
    const callbackUrlBase = this.configService.getOrThrow('MAIL_CALLBACK_URL');

    try {
      await axios.post(
        url,
        {
          subscriber: email,
          name,
          callbackUrl: `${callbackUrlBase}?code=${code}`,
        },
        { headers: { AccessToken: this.accessToken } },
      );
    } catch (err: unknown) {
      throw new InternalServerErrorException('이메일 전송 실패');
    }
  }

  private async subscribe(email: string, name: string) {
    const url = this.configService.getOrThrow('STIBEE_SUBSCRIBE_URL');

    try {
      await axios.post(
        url,
        {
          subscribers: [
            {
              email,
              name,
            },
          ],
        },
        { headers: { AccessToken: this.accessToken } },
      );
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException('스티비 구독 실패');
    }
  }

  async unsubscribe(email: string) {
    const url = this.configService.get('STIBEE_SUBSCRIBE_URL');
    try {
      await axios.delete(url, {
        data: [email],
        headers: { AccessToken: this.accessToken },
      });
    } catch (err) {
      throw new InternalServerErrorException('스티비 구독 해지 실패');
    }
  }
}
