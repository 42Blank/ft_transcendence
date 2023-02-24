import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type EveryThing = string | number | boolean | null | undefined | Record<string, unknown>;

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
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
      throw new UnauthorizedException(`깃허브 인증에 실패했습니다. \n(${(e as Error).message})`);
    }
  }
}
