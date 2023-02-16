import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type EveryThing = string | number | boolean | null | undefined | Record<string, unknown>;

@Injectable()
export class FtJwtAuthGuard extends AuthGuard('ft-jwt-auth') {
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
      throw new UnauthorizedException(
        `42프로필 확인에 실패했습니다. 42 인증을 했는지 확인해주세요. \n(${(e as Error).message})`,
      );
    }
  }
}
