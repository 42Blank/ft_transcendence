import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type EveryThing = string | number | boolean | null | undefined | Record<string, unknown>;

@Injectable()
export class UserJwtAuthGuard extends AuthGuard('user-jwt-auth') {
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
      throw new UnauthorizedException(`${(e as Error).message} : 로그인을 했는지 확인해주세요`);
    }
  }
}
