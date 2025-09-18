import { Inject, Injectable } from '@nestjs/common';
import {
  AssignPermissionToRoleDto,
  AssignRoleDto,
  CreatePermissionDto,
  CreateRoleDto,
  LoginDto,
  RegistrationDto,
  UpdatePermissionDto,
  UpdateRoleDto,
  UpdateUserDto,
} from '@app/common/dtos';
import { ClientProxy } from '@nestjs/microservices';
import { Command } from '@app/common/enums';

@Injectable()
export class ApiService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  registration(registrationData: RegistrationDto) {
    return this.authService.send(
      { cmd: Command.REGISTRATION },
      registrationData,
    );
  }

  login(loginData: LoginDto) {
    return this.authService.send({ cmd: Command.LOGIN }, loginData);
  }

  updateProfile(id: number, updateUserDto: UpdateUserDto) {
    return this.usersService.send(
      { cmd: Command.UPDATE_USER },
      { id, updateUserDto },
    );
  }

  // Roles
  createRole(createRoleDto: CreateRoleDto) {
    return this.usersService.send({ cmd: Command.CREATE_ROLE }, createRoleDto);
  }

  findAllRoles() {
    return this.usersService.send({ cmd: Command.FIND_ALL_ROLES }, {});
  }

  findOneRole(id: number) {
    return this.usersService.send({ cmd: Command.FIND_ONE_ROLE }, id);
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return this.usersService.send(
      { cmd: Command.UPDATE_ROLE },
      { id, updateRoleDto },
    );
  }

  removeRole(id: number) {
    return this.usersService.send({ cmd: Command.REMOVE_ROLE }, id);
  }

  // Permissions
  createPermission(createPermissionDto: CreatePermissionDto) {
    return this.usersService.send(
      { cmd: Command.CREATE_PERMISSION },
      createPermissionDto,
    );
  }

  createBulkPermission(createPermissionDto: any) {
    return this.usersService.send(
      { cmd: Command.CREATE_BULK_PERMISSION },
      createPermissionDto,
    );
  }

  findAllPermissions() {
    return this.usersService.send({ cmd: Command.FIND_ALL_PERMISSIONS }, {});
  }

  findOnePermission(id: number) {
    return this.usersService.send({ cmd: Command.FIND_ONE_PERMISSION }, id);
  }

  updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.usersService.send(
      { cmd: Command.UPDATE_PERMISSION },
      { id, updatePermissionDto },
    );
  }

  removePermission(id: number) {
    return this.usersService.send({ cmd: Command.REMOVE_PERMISSION }, id);
  }

  // Assignments
  assignRoleToUser(assignRoleDto: AssignRoleDto) {
    return this.usersService.send(
      { cmd: Command.ASSIGN_ROLE_TO_USER },
      assignRoleDto,
    );
  }

  assignPermissionToRole(assignPermissionToRoleDto: AssignPermissionToRoleDto) {
    return this.usersService.send(
      { cmd: Command.ASSIGN_PERMISSION_TO_ROLE },
      assignPermissionToRoleDto,
    );
  }
}
