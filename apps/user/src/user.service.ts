import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import {
  UpdateUserDto,
  AssignRoleDto,
  AssignPermissionToRoleDto,
} from '@app/common/dtos';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    try {
      const user = await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new RpcException({
          status: 409,
          message: 'Email already exists',
        });
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new RpcException({
          status: 404,
          message: 'User not found',
        });
      }
      throw error;
    }
  }

  async assignRoleToUser(assignRoleDto: AssignRoleDto) {
    const { userId, roleId } = assignRoleDto;
    // Check if user and role exist
    const user = await this.databaseService.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new RpcException({ status: 404, message: 'User not found' });
    }
    const role = await this.databaseService.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new RpcException({ status: 404, message: 'Role not found' });
    }

    try {
      return await this.databaseService.userRole.create({
        data: {
          userId,
          roleId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new RpcException({ status: 409, message: 'User already has this role' });
      }
      throw error;
    }
  }

  async assignPermissionToRole(assignPermissionToRoleDto: AssignPermissionToRoleDto) {
    const { roleId, permissionId } = assignPermissionToRoleDto;
    // Check if role and permission exist
    const role = await this.databaseService.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new RpcException({ status: 404, message: 'Role not found' });
    }
    const permission = await this.databaseService.permission.findUnique({ where: { id: permissionId } });
    if (!permission) {
      throw new RpcException({ status: 404, message: 'Permission not found' });
    }

    try {
      return await this.databaseService.rolePermission.create({
        data: {
          roleId,
          permissionId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new RpcException({ status: 409, message: 'Role already has this permission' });
      }
      throw error;
    }
  }
}
