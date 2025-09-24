export enum Endpoint {
  // -------- AUTH ------------
  LOGIN = 'auth/login',
  REGISTRATION = 'auth/registration',
  FORGET_PASSWORD = 'auth/forget-password',
  VERIFY_EMAIL = 'auth/verify-email',
  SEND_OTP = 'auth/send-otp',
  RESEND_OTP = 'auth/resend-otp',

  //--------- ROLES ----------
  GET_ALL_ROLES = 'roles',
  GET_ROLE_BY_ROLE_ID = 'roles/:id',
  GET_ALL_ROLES_PERMISSION = 'roles/get-permission',
  GET_ALL_ROLE_USERS_BY_ROLE_ID = 'roles/:roleId/users',
  CREATE_ROLE = 'roles/create',
  UPDATE_ROLE_BY_ROLE_ID = 'roles/:roleId/update',
  DELETE_ROLE_BY_ROLE_ID = 'roles/:roleId/delete',
  DEACTIVATE_ROLE_BY_ROLE_ID = 'roles/:roleId/deactivate',
  ACTIVATE_ROLE_BY_ROLE_ID = 'roles/:roleId/activate',
  ASSIGN_ROLE_TO_USER = 'roles/assign',
  REMOVE_ROLE_FROM_USER = 'roles/remove',

  // --------- USER -----------
  CREATE_USER = 'users/create',
  CREATE_BULK_USERS_BY_CSV = 'users/create-by-csv',
  CREATE_BULK_USERS_BY_JSON = 'users/create-by-json',
  BLOCK_USER_BY_USER_ID = 'users/:userId/block',
  DEACTIVATE_USER_BY_USER_ID = 'users/:userId/deactivate',
  GET_USER_BY_USER_ID = 'users/:userId',
  UPDATE_USER_BY_USER_ID = 'users/:userId/update',
  DELETE_USER_BY_USER_ID = 'users/:userId/delete',
  GET_USER_PROFILE = 'users/profile',

  // ---------- PERMISSION -----
  CREATE_PERMISSION = 'permissions/create',
  GET_ALL_PERMISSIONS = 'permissions',
  CREATE_BULK_PERMISSIONS_BY_CSV = 'permissions/create-by-csv',
  CREATE_BULK_PERMISSIONS_BY_JSON = 'permissions/create-by-json',
  CREATE_BULK_PERMISSIONS = 'permissions/bulk/create',
  BLOCK_PERMISSION_BY_PERMISSION_ID = 'permissions/:permissionId/block',
  DEACTIVATE_PERMISSION_BY_PERMISSION_ID = 'permissions/:permissionId/deactivate',
  GET_PERMISSION_BY_PERMISSION_ID = 'permissions/:permissionId',
  UPDATE_PERMISSION_BY_PERMISSION_ID = 'permissions/:permissionId/update',
  DELETE_PERMISSION_BY_PERMISSION_ID = 'permissions/:permissionId/delete',
  ASSIGN_PERMISSION_TO_ROLE = 'permissions/assign-to-role',
  ASSIGN_PERMISSION_TO_USER = 'permissions/assign-to-user',
  REMOVE_PERMISSION_FROM_ROLE = 'permissions/remove-from-role',
  REMOVE_PERMISSION_FROM_USER = 'permissions/remove-from-user',
  // ---------- CLASS ----------
  CREATE_CLASS = 'classes/create',
  GET_ALL_CLASSES = 'classes',
  GET_CLASS_BY_ID = 'classes/:classId',
  UPDATE_CLASS_BY_ID = 'classes/:classId/update',
  DELETE_CLASS_BY_ID = 'classes/:classId/delete',

  // ---------- MODULE ---------
  CREATE_MODULE = 'modules/create',
  GET_ALL_MODULES = 'modules',
  GET_MODULE_BY_ID = 'modules/:moduleId',
  UPDATE_MODULE_BY_ID = 'modules/:moduleId/update',
  DELETE_MODULE_BY_ID = 'modules/:moduleId/delete',

  // ---------- QUIZ -----------
  CREATE_QUIZ = 'quizzes/create',
  GET_ALL_QUIZZES = 'quizzes',
  GET_QUIZ_BY_ID = 'quizzes/:quizId',
  UPDATE_QUIZ_BY_ID = 'quizzes/:quizId/update',
  DELETE_QUIZ_BY_ID = 'quizzes/:quizId/delete',
  ASSIGN_QUIZ_TO_CLASS = 'quizzes/:quizId/assign-to-class',

  // ---------- ANSWER ---------
  CREATE_ANSWER = 'answers/create',
  GET_ALL_ANSWERS = 'answers',
  GET_ANSWER_BY_ID = 'answers/:answerId',
  UPDATE_ANSWER_BY_ID = 'answers/:answerId/update',
  DELETE_ANSWER_BY_ID = 'answers/:answerId/delete',

  // ---------- QUESTION BANK ----------
  CREATE_QUESTION = 'questions/create',
  GET_ALL_QUESTIONS = 'questions',
  GET_QUESTION_BY_ID = 'questions/:questionId',
  UPDATE_QUESTION_BY_ID = 'questions/:questionId/update',
  DELETE_QUESTION_BY_ID = 'questions/:questionId/delete',

  // ---------- CORRECT ANSWER ----------
  SET_CORRECT_ANSWER = 'correct-answers/set',
  GET_CORRECT_ANSWER = 'correct-answers/:questionId',
  UPDATE_CORRECT_ANSWER = 'correct-answers/:questionId/update',
  DELETE_CORRECT_ANSWER = 'correct-answers/:questionId/delete',

  // ---------- BLOGS ----------
  CREATE_BLOG = 'blogs/create',
  GET_ALL_BLOGS = 'blogs',
  GET_BLOG_BY_ID = 'blogs/:blogId',
  UPDATE_BLOG_BY_ID = 'blogs/:blogId/update',
  DELETE_BLOG_BY_ID = 'blogs/:blogId/delete',

  // ---------- DISCUSSION ----------
  CREATE_DISCUSSION = 'discussions/create',
  GET_ALL_DISCUSSIONS = 'discussions',
  GET_DISCUSSION_BY_ID = 'discussions/:discussionId',
  UPDATE_DISCUSSION_BY_ID = 'discussions/:discussionId/update',
  DELETE_DISCUSSION_BY_ID = 'discussions/:discussionId/delete',

  // ---------- PAYMENTS ----------
  INITIATE_PAYMENT = 'payments/initiate',
  GET_ALL_PAYMENTS = 'payments',
  GET_PAYMENT_BY_ID = 'payments/:paymentId',
  VERIFY_PAYMENT = 'payments/:paymentId/verify',
  REFUND_PAYMENT = 'payments/:paymentId/refund',

  // ---------- CONFIGURATION ----------
  CREATE_CONFIG = 'config/create',
  GET_ALL_CONFIGS = 'config',
  GET_CONFIG_BY_ID = 'config/:configId',
  UPDATE_CONFIG_BY_ID = 'config/:configId/update',
  DELETE_CONFIG_BY_ID = 'config/:configId/delete',

  // ---------- REVIEWS ----------
  CREATE_REVIEW = 'reviews/create',
  GET_ALL_REVIEWS = 'reviews',
  GET_REVIEW_BY_ID = 'reviews/:reviewId',
  UPDATE_REVIEW_BY_ID = 'reviews/:reviewId/update',
  DELETE_REVIEW_BY_ID = 'reviews/:reviewId/delete',
}
