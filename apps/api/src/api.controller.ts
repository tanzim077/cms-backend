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
import { PERMISSION } from '@app/common/enums'; // Direct import

@Controller({
  path: 'api',
  version: '1',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.apiService.registration(registrationDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.apiService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@CurrentUser() user: UserPayload) {
    return user;
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.USER_UPDATE)
  @Patch('profile')
  updateProfile(
    @CurrentUser() user: UserPayload,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.apiService.updateProfile(user.id, updateUserDto);
  }

  // Roles
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_CREATE)
  @Post('roles')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.apiService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_VIEW)
  @Get('roles')
  findAllRoles() {
    return this.apiService.findAllRoles();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_VIEW)
  @Get('roles/:id')
  findOneRole(@Param('id') id: string) {
    return this.apiService.findOneRole(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_UPDATE)
  @Patch('roles/:id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.apiService.updateRole(+id, updateRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_DELETE)
  @Delete('roles/:id')
  removeRole(@Param('id') id: string) {
    return this.apiService.removeRole(+id);
  }

  // Permissions
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Post('permissions')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.apiService.createPermission(createPermissionDto);
  }

  @Post('bulk-permissions')
  createBulkPermission(@Body() createPermissionDto: any) {
    return this.apiService.createBulkPermission(createPermissionDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get('permissions')
  findAllPermissions() {
    return this.apiService.findAllPermissions();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_VIEW)
  @Get('permissions/:id')
  findOnePermission(@Param('id') id: string) {
    return this.apiService.findOnePermission(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Patch('permissions/:id')
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.apiService.updatePermission(+id, updatePermissionDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Delete('permissions/:id')
  removePermission(@Param('id') id: string) {
    return this.apiService.removePermission(+id);
  }

  // Assignments
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.ROLE_ASSIGN)
  @Post('users/assign-role')
  assignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.apiService.assignRoleToUser(assignRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @RequiredPermissions(PERMISSION.PERMISSION_ASSIGN)
  @Post('roles/assign-permission')
  assignPermissionToRole(
    @Body() assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ) {
    return this.apiService.assignPermissionToRole(assignPermissionToRoleDto);
  }
}
