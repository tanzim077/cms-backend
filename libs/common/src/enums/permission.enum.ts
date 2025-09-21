export enum PERMISSION {
  // User Management
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_VIEW = 'user:view',

  // Course Management
  COURSE_CREATE = 'course:create',
  COURSE_UPDATE = 'course:update',
  COURSE_DELETE = 'course:delete',
  COURSE_VIEW = 'course:view',

  // class Management
  CLASS_CREATE = 'class:create',
  CLASS_UPDATE = 'class:update',
  CLASS_DELETE = 'class:delete',
  CLASS_VIEW = 'class:view',

  // Quiz Management
  QUIZ_CREATE = 'quiz:create',
  QUIZ_UPDATE = 'quiz:update',
  QUIZ_DELETE = 'quiz:delete',
  QUIZ_VIEW = 'quiz:view',

  // Question Management
  QUESTION_CREATE = 'question:create',
  QUESTION_UPDATE = 'question:update',
  QUESTION_DELETE = 'question:delete',
  QUESTION_VIEW = 'question:view',

  // Report Management
  REPORT_CREATE = 'report:create',
  REPORT_UPDATE = 'report:update',
  REPORT_DELETE = 'report:delete',
  REPORT_VIEW = 'report:view',

  // Answer Management
  ANSWER_CREATE = 'answer:create',
  ANSWER_UPDATE = 'answer:update',
  ANSWER_DELETE = 'answer:delete',
  ANSWER_VIEW = 'answer:view',

  // Subscription Management
  SUBSCRIPTION_CREATE = 'subscription:create',
  SUBSCRIPTION_UPDATE = 'subscription:update',
  SUBSCRIPTION_DELETE = 'subscription:delete',
  SUBSCRIPTION_VIEW = 'subscription:view',

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
