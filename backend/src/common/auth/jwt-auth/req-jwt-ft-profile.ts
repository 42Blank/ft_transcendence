import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FtProfile } from '../types';

/**
 * @description Request에 담긴 FortyTwoProfile를 가져온다.
 */
export const ReqJwtFtProfile = createParamDecorator((data, ctx: ExecutionContext): FtProfile => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
