import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller({
  version: '1',
  path: 'api',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // ------------Auth------------------
  @Post()
  registration() {}

  @Post()
  login() {}

  @Post()
  forgetPassword() {}

  @Post()
  verifyEmail() {}

  @Post()
  sendOtp() {}

  @Post()
  sendVerificationEmail() {}
  // -------------------------------------------
  // ----------------Role-----------------------
  @Post()
  createRole() {}

  @Get()
  getRoles() {}

  @Post()
  updateRole() {}

  @Post()
  deleteRole() {}

  @Post()
  assignRoleToUser() {}

  @Post()
  removeRoleFromUser() {}

  @Post()
  assignDefaultPermissionToRole() {}

  @Post()
  assignPermissionToRole() {}

  @Post()
  removePermissionFromRole() {}
  // -------------------------------------------

  // ----------------Permission-----------------
  @Post()
  createPermission() {}

  @Get()
  getPermissions() {}

  @Post()
  updatePermission() {}

  @Post()
  deletePermission() {}

  @Post()
  assignPermissionToUser() {}

  @Post()
  removePermissionFromUser() {}


  // -------------------------------------------
  // ----------------Payment--------------------

  @Post()
  processPayment() {}

  @Post()
  refundPayment() {}

  @Get()
  getPaymentStatus() {}

  @Get()
  getTransactionHistory() {}

  @Post()
  createSubscription() {}

  @Post()
  cancelSubscription() {}

  @Get()
  getSubscriptionDetails() {}

  // -------------------------------------------
  // ----------------Quiz-----------------------
  @Post()
  createQuiz() {}

  @Get()
  getQuizzes() {}

  @Post()
  updateQuiz() {}

  @Post()
  deleteQuiz() {}

  // -------------------------------------------
  // ----------------promo----------------------
  @Post()
  createPromo() {}

  @Get()
  getPromos() {}

  @Post()
  updatePromo() {}

  @Post()
  deletePromo() {}
  // -------------------------------------------
  // ----------------profile--------------------
  @Post()
  createProfile() {}

  @Get()
  getProfiles() {}

  @Post()
  updateProfile() {}

  @Post()
  deleteProfile() {}
  // -------------------------------------------
  // ----------------Notification-------------
  @Post()
  createNotification() {}

  @Get()
  getNotifications() {}

  @Post()
  updateNotification() {}

  @Post()
  deleteNotification() {}
  // -------------------------------------------
  // ----------------Course--------------------
  @Post()
  enrollCourse() {}

  @Post()
  blockUserFromCourse() {}

  @Post()
  removeUserFromCourse() {}

  @Get()
  getEnrolledCourses() {}

  @Post()
  completeCourse() {}

  @Get()
  getCourseProgress() {}

  @Post()
  rateCourse() {}

  @Post()
  reviewCourse() {}
  // -------------------------------------------
  // ----------------Analytics-----------------
  @Get()
  getUserAnalytics() {}

  @Get()
  getCourseAnalytics() {}

  @Get()
  getEngagementMetrics() {}

  @Get()
  getRevenueMetrics() {}
  // -------------------------------------------
  // ----------------Content-------------------
  @Post()
  uploadContent() {}

  @Get()
  getContents() {}

  @Post()
  updateContent() {}

  @Post()
  deleteContent() {}
  // -------------------------------------------
  // ----------------Instructor----------------
  @Post()
  applyInstructor() {}

  @Get()
  getInstructors() {}

  @Post()
  approveInstructor() {}

  @Post()
  rejectInstructor() {}
  // -------------------------------------------
  // ----------------Certificate---------------
  @Post()
  generateCertificate() {}

  @Get()
  getCertificates() {}

  @Post()
  verifyCertificate() {}
  // -------------------------------------------
  // ----------------Review--------------------
  @Post()
  createReview() {}

  @Get()
  getReviews() {}

  @Post()
  updateReview() {}

  @Post()
  deleteReview() {}
  // -------------------------------------------
  // ----------------File Manager---------------
  @Post()
  uploadFile() {}

  @Get()
  getFiles() {}

  @Post()
  deleteFile() {}

  @Post()
  shareFile() {}

  // -------------------------------------------
  // ----------------Discussion-----------------
  @Post()
  createDiscussion() {}

  @Get()
  getDiscussions() {}

  @Post()
  updateDiscussion() {}

  @Post()
  deleteDiscussion() {}
  // -------------------------------------------
  // ----------------Blogs----------------------
  @Post()
  createBlog() {}

  @Get()
  getBlogs() {}

  @Post()
  updateBlog() {}

  @Post()
  deleteBlog() {}

  // -------------------------------------------
  // ----------------Quiz-----------------------
  @Post()
  createQuizAttempt() {}

  @Get()
  getQuizAttempts() {}

  @Post()
  submitQuiz() {}

  @Get()
  getQuizResults() {}

  // -------------------------------------------
  // ----------------Messages-------------------
  @Post()
  sendMessage() {}

  @Get()
  getMessages() {}

  @Post()
  deleteMessage() {}

  @Post()
  markMessageAsRead() {}

  // -------------------------------------------
  // ----------------Configuration--------------
  @Post()
  createConfig() {}

  @Get()
  getConfigs() {}

  @Post()
  updateConfig() {}

  @Post()
  deleteConfig() {}
  // -------------------------------------------

  // ----------------course---------------------
  @Post()
  createCourse() {}

  @Post()
  createModule() {}

  @Post()
  createClass() {}

  @Post()
  createContent() {}

  @Post()
  createQuestionBank() {}

  @Post()
  createQuestion() {}
  // --------------------------------------------
}
