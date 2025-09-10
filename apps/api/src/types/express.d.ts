import { UserPayload } from '@app/common/dtos';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
