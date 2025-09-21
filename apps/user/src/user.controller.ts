import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Command } from '@app/common/enums';
import { Prisma, User } from '@prisma/client';
import { AssignPermissionToRoleDto, AssignRoleDto } from '@app/common/dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern({ cmd: Command.UPDATE_USER })
  async updateUser(
    @Payload() data: { id: number; updateUserDto: Prisma.UserUpdateInput },
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

  @MessagePattern({ cmd: Command.SHOW_ROLE_PERMISSION })
  async showRolePermissions(@Payload() roleId: number) {
    try {
      return await this.userService.showRollPermission(roleId);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException('An unexpected error occurred');
    }
  }

  // @MessagePattern({ cmd: Command.ASSIGN_ROLE_TO_USER })
  // async assignRoleToUser(@Payload() assignRoleDto: AssignRoleDto) {
  //   try {
  //     return await this.userService.assignRoleToUser(assignRoleDto);
  //   } catch (error) {
  //     if (error instanceof RpcException) {
  //       throw error;
  //     }
  //     throw new RpcException('An unexpected error occurred');
  //   }
  // }
}
