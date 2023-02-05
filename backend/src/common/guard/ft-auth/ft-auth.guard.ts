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
      throw new BadRequestException((e as Error).message);
    }
  }
}
