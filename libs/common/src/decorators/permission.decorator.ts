import { SetMetadata } from '@nestjs/common';
import { PERMISSION } from '@app/common/enums';

export const PERMISSIONS_KEY = 'permissions';
export const RequiredPermissions = (...permissions: PERMISSION[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
