import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';

/**
 * @description Client에 담긴 User를 가져온다.
 */
export const SocketUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToWs().getClient();

  return req.user;
});
