import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type EveryThing = string | number | boolean | null | undefined | Record<string, unknown>;

@Injectable()
export class FtAuthGuard extends AuthGuard('42') {
  handleRequest<TUser>(
    err: EveryThing,
    user: EveryThing,
    info: EveryThing,
    context: ExecutionContext,
    status?: EveryThing,
  ): TUser {
    try {
      return super.handleRequest(err, user, info, context, status);
    } catch (e: unknown) {
      throw new BadRequestException(`42인증에 실패했습니다. 다시 시도해주세요. \n(${(e as Error).message})`);
    }
  }
}
