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

@Controller({
  path: 'api',
  version: '1',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // ----------- Auth ---------------
  @Post(EP.REGISTRATION)
  registration(@Body() registrationDto: RegistrationDto) {
    return this.apiService.registration(registrationDto);
  }

  @Post(EP.LOGIN)
  login(@Body() loginDto: LoginDto) {
    return this.apiService.login(loginDto);
  }

  // ---------- User ------------------
  @UseGuards(AuthGuard('jwt'))
  @Get(EP.GET_USER_PROFILE)
  getProfile(@CurrentUser() user: UserPayload) {
    return user;
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.USER_UPDATE)
  @Patch(EP.UPDATE_MY_PROFILE)
  updateProfile(
    @CurrentUser() user: UserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.apiService.updateProfile(user.id, updateUserDto);
  }

  // ---------- Permission ------------------

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Post(EP.CREATE_PERMISSION)
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.apiService.createPermission(createPermissionDto);
  }

  @Post(EP.CREATE_BULK_PERMISSIONS)
  createBulkPermission(@Body() createPermissionDto: any) {
    return this.apiService.createBulkPermission(createPermissionDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get(EP.GET_ALL_PERMISSIONS)
  findAllPermissions() {
    return this.apiService.findAllPermissions();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get(EP.GET_PERMISSION_BY_PERMISSION_ID)
  findOnePermission(@Param('id') id: string) {
    return this.apiService.findOnePermission(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Patch(EP.UPDATE_PERMISSION_BY_PERMISSION_ID)
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.apiService.updatePermission(+id, updatePermissionDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Delete(EP.DELETE_PERMISSION_BY_PERMISSION_ID)
  removePermission(@Param('id') id: string) {
    return this.apiService.removePermission(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Post(EP.ASSIGN_PERMISSION_TO_ROLE)
  assignPermissionToRole(
    @Body() assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ) {
    return this.apiService.assignPermissionToRole(assignPermissionToRoleDto);
  }

  // ---------- Role ------------------

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_VIEW)
  @Get(EP.GET_ALL_ROLES)
  findAllRoles() {
    return this.apiService.findAllRoles();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_CREATE)
  @Post(EP.CREATE_ROLE)
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.apiService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_VIEW)
  @Get(EP.GET_ROLE_BY_ROLE_ID)
  findOneRole(@Param('id') id: string) {
    return this.apiService.findOneRole(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_UPDATE)
  @Patch(EP.UPDATE_ROLE_BY_ROLE_ID)
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.apiService.updateRole(+id, updateRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_DELETE)
  @Delete(EP.DELETE_ROLE_BY_ROLE_ID)
  removeRole(@Param('id') id: string) {
    return this.apiService.removeRole(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get(EP.GET_ALL_ROLES_PERMISSION)
  findPermissionsByRole(@Param('roleId') roleId: number) {
    return this.apiService.findPermissionsByRole(roleId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_ASSIGN)
  @Post(EP.ASSIGN_ROLE_TO_USER)
  assignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.apiService.assignRoleToUser(assignRoleDto);
  }
}
