import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  UpdateUserDto,
  AssignRoleDto,
  AssignPermissionToRoleDto,
} from '@app/common/dtos';
import { Command } from '@app/common/enums';
import { RpcException } from '@nestjs/microservices';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern({ cmd: Command.UPDATE_USER })
  async updateUser(
    @Payload() data: { id: number; updateUserDto: UpdateUserDto },
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this.userService.updateUser(data.id, data.updateUserDto);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException('An unexpected error occurred');
    }
  }

  @MessagePattern({ cmd: Command.ASSIGN_ROLE_TO_USER })
  async assignRoleToUser(@Payload() assignRoleDto: AssignRoleDto) {
    try {
      return await this.userService.assignRoleToUser(assignRoleDto);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException('An unexpected error occurred');
    }
  }

  @MessagePattern({ cmd: Command.ASSIGN_PERMISSION_TO_ROLE })
  async assignPermissionToRole(
    @Payload() assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ) {
    try {
      return await this.userService.assignPermissionToRole(
        assignPermissionToRoleDto,
      );
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException('An unexpected error occurred');
    }
  }
}
