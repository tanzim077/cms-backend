export enum PERMISSION {
  // User Management
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_VIEW = 'user:view',

  // Role Management
  ROLE_CREATE = 'role:create',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',
  ROLE_VIEW = 'role:view',
  ROLE_ASSIGN = 'role:assign',

  // Permission Management
  PERMISSION_VIEW = 'permission:view',
  PERMISSION_ASSIGN = 'permission:assign',
}
