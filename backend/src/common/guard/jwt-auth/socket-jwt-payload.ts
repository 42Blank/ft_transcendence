import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwtPayload';

/**
 * @description Client에 담긴 User를 가져온다.
 */
export const SocketJwtPayload = createParamDecorator((data, ctx: ExecutionContext): JwtPayload => {
  const req = ctx.switchToWs().getClient();

  return req.user;
});
