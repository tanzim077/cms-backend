import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'; // Import Request from express

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>(); // Explicitly type the request object
    return request.user;
  },
);
