export const PERMISSIONS = {
  // Auth Management
  AUTH_PROFILE_READ: 'auth:profile:read',
  AUTH_PROFILE_UPDATE: 'auth:profile:update',

  // User Management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_LIST: 'user:list',

  // Role Management
  ROLE_CREATE: 'role:create',
  ROLE_READ: 'role:read',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
  ROLE_LIST: 'role:list',
  ROLE_ASSIGN: 'role:assign',

  // Permission Management
  PERMISSION_CREATE: 'permission:create',
  PERMISSION_READ: 'permission:read',
  PERMISSION_UPDATE: 'permission:update',
  PERMISSION_DELETE: 'permission:delete',
  PERMISSION_LIST: 'permission:list',

  // Course Management
  COURSE_CREATE: 'course:create',
  COURSE_READ: 'course:read',
  COURSE_UPDATE: 'course:update',
  COURSE_DELETE: 'course:delete',
  COURSE_LIST: 'course:list',
  COURSE_ENROLL: 'course:enroll',
  COURSE_PUBLISH: 'course:publish',

  // Quiz Management
  QUIZ_CREATE: 'quiz:create',
  QUIZ_READ: 'quiz:read',
  QUIZ_UPDATE: 'quiz:update',
  QUIZ_DELETE: 'quiz:delete',
  QUIZ_LIST: 'quiz:list',
  QUIZ_SUBMIT: 'quiz:submit',
  QUIZ_REVIEW: 'quiz:review',

  // System Administration
  SYSTEM_ADMIN: 'system:admin',
} as const;

export const ROLE_LEVELS = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
  USER: 'user',
  VIEWER: 'viewer',
} as const;

export const DEFAULT_PERMISSIONS = {
  [ROLE_LEVELS.ADMIN]: Object.values(PERMISSIONS),
  [ROLE_LEVELS.MODERATOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_LIST,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.COURSE_READ,
    PERMISSIONS.COURSE_LIST,
    PERMISSIONS.COURSE_UPDATE,
    PERMISSIONS.COURSE_PUBLISH,
    PERMISSIONS.QUIZ_READ,
    PERMISSIONS.QUIZ_LIST,
    PERMISSIONS.QUIZ_UPDATE,
    PERMISSIONS.QUIZ_REVIEW,
  ],
  [ROLE_LEVELS.INSTRUCTOR]: [
    PERMISSIONS.AUTH_PROFILE_READ,
    PERMISSIONS.AUTH_PROFILE_UPDATE,
    PERMISSIONS.COURSE_CREATE,
    PERMISSIONS.COURSE_READ,
    PERMISSIONS.COURSE_UPDATE,
    PERMISSIONS.COURSE_LIST,
    PERMISSIONS.QUIZ_CREATE,
    PERMISSIONS.QUIZ_READ,
    PERMISSIONS.QUIZ_UPDATE,
    PERMISSIONS.QUIZ_LIST,
    PERMISSIONS.QUIZ_REVIEW,
  ],
  [ROLE_LEVELS.STUDENT]: [
    PERMISSIONS.AUTH_PROFILE_READ,
    PERMISSIONS.AUTH_PROFILE_UPDATE,
    PERMISSIONS.COURSE_READ,
    PERMISSIONS.COURSE_LIST,
    PERMISSIONS.COURSE_ENROLL,
    PERMISSIONS.QUIZ_READ,
    PERMISSIONS.QUIZ_LIST,
    PERMISSIONS.QUIZ_SUBMIT,
  ],
  [ROLE_LEVELS.USER]: [
    PERMISSIONS.AUTH_PROFILE_READ,
    PERMISSIONS.AUTH_PROFILE_UPDATE,
    PERMISSIONS.COURSE_READ,
    PERMISSIONS.COURSE_LIST,
  ],
  [ROLE_LEVELS.VIEWER]: [PERMISSIONS.COURSE_READ, PERMISSIONS.COURSE_LIST],
};
