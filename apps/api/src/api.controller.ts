import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import {
  AssignPermissionToRoleDto,
  AssignRoleDto,
  CreatePermissionDto,
  CreateRoleDto,
  RegistrationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
  UpdateUserDto,
  UserPayload,
} from '@app/common/dtos';
import { LoginDto } from '@app/common/dtos/auth/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@app/common/decorators';
import { PermissionsGuard } from '@app/common/guards/permission.guard';
import { RequiredPermissions } from '@app/common/decorators/permission.decorator';
import { PERMISSION } from '@app/common/enums';
import { Endpoint as EP } from './enums'; // Direct import
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  loginRequestExample,
  loginResponseExample,
  registrationRequestExample,
  registrationResponseExample,
} from './examples/swagger-examples';

@ApiTags('Auth', 'User', 'Role', 'Permission')
@ApiBearerAuth()
@Controller({
  path: 'api',
  version: '1',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // ------------------------------- Auth -------------------------------------------------------- #
  @Post(EP.REGISTRATION)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegistrationDto,
    examples: registrationRequestExample,
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    schema: {
      example: registrationResponseExample,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error.',
  })
  registration(@Body() registrationDto: RegistrationDto) {
    return this.apiService.registration(registrationDto);
  }

  @Post(EP.LOGIN)
  @ApiOperation({
    summary: 'Login a user',
    description:
      'Login and copy the access_token from the response. Then click the "Authorize" button in Swagger UI and paste the token as Bearer <token> to access protected endpoints.',
  })
  @ApiBody({
    type: LoginDto,
    examples: loginRequestExample,
  })
  @ApiResponse({
    status: 200,
    description:
      'User logged in successfully. Response contains access_token, refresh_token, and user info.',
    schema: {
      example: loginResponseExample,
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Body() loginDto: LoginDto) {
    return this.apiService.login(loginDto);
  }
  // ##################################################################################################

  // ------------------------------ User -------------------------------------------------------- #

  @UseGuards(AuthGuard('jwt'))
  @Get(EP.GET_USER_PROFILE)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved.' })
  getProfile(@CurrentUser() user: UserPayload) {
    return user;
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.USER_UPDATE)
  @Patch(EP.UPDATE_MY_PROFILE)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User profile updated.' })
  updateProfile(
    @CurrentUser() user: UserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.apiService.updateProfile(user.id, updateUserDto);
  }
  // ##################################################################################################

  // ----------------------------- Permission -------------------------------------------------------- #
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Post(EP.CREATE_PERMISSION)
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'Permission created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.apiService.createPermission(createPermissionDto);
  }

  @Post(EP.CREATE_BULK_PERMISSIONS)
  @ApiOperation({ summary: 'Create permissions in bulk' })
  @ApiResponse({
    status: 201,
    description: 'Permissions created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  createBulkPermission(@Body() createPermissionDto: any) {
    return this.apiService.createBulkPermission(createPermissionDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get(EP.GET_ALL_PERMISSIONS)
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions retrieved.' })
  findAllPermissions() {
    return this.apiService.findAllPermissions();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get(EP.GET_PERMISSION_BY_PERMISSION_ID)
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiResponse({ status: 200, description: 'Permission details retrieved.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  findOnePermission(@Param('id') id: string) {
    return this.apiService.findOnePermission(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Patch(EP.UPDATE_PERMISSION_BY_PERMISSION_ID)
  @ApiOperation({ summary: 'Update a permission by ID' })
  @ApiResponse({ status: 200, description: 'Permission updated successfully.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.apiService.updatePermission(+id, updatePermissionDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Delete(EP.DELETE_PERMISSION_BY_PERMISSION_ID)
  @ApiOperation({ summary: 'Delete a permission by ID' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  removePermission(@Param('id') id: string) {
    return this.apiService.removePermission(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Post(EP.ASSIGN_PERMISSION_TO_ROLE)
  @ApiOperation({ summary: 'Assign a permission to a role' })
  @ApiResponse({ status: 200, description: 'Permission assigned to role.' })
  assignPermissionToRole(
    @Body() assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ) {
    return this.apiService.assignPermissionToRole(assignPermissionToRoleDto);
  }

  // ##################################################################################################

  // ------------------------------------- Role -------------------------------------------------------- #
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_VIEW)
  @Get(EP.GET_ALL_ROLES)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles retrieved.' })
  findAllRoles() {
    return this.apiService.findAllRoles();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_CREATE)
  @Post(EP.CREATE_ROLE)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.apiService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_VIEW)
  @Get(EP.GET_ROLE_BY_ROLE_ID)
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiResponse({ status: 200, description: 'Role details retrieved.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  findOneRole(@Param('id') id: string) {
    return this.apiService.findOneRole(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_UPDATE)
  @Patch(EP.UPDATE_ROLE_BY_ROLE_ID)
  @ApiOperation({ summary: 'Update a role by ID' })
  @ApiResponse({ status: 200, description: 'Role updated successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.apiService.updateRole(+id, updateRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_DELETE)
  @Delete(EP.DELETE_ROLE_BY_ROLE_ID)
  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  removeRole(@Param('id') id: string) {
    return this.apiService.removeRole(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get(EP.GET_ALL_ROLES_PERMISSION)
  @ApiOperation({ summary: 'Get permissions by role ID' })
  @ApiResponse({
    status: 200,
    description: 'List of permissions for the role.',
  })
  findPermissionsByRole(@Param('roleId') roleId: number) {
    return this.apiService.findPermissionsByRole(roleId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_ASSIGN)
  @Post(EP.ASSIGN_ROLE_TO_USER)
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiResponse({ status: 200, description: 'Role assigned to user.' })
  assignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.apiService.assignRoleToUser(assignRoleDto);
  }
  // ##################################################################################################

  // --------------------------------- Class ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Module ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Quiz ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Question Bank ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Review ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Content ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Module ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Module ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Module ---------------------------------------------------------- #
  // ####################################################################################################

  // --------------------------------- Module ---------------------------------------------------------- #
  // ####################################################################################################
}
