import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UpdateUserDto } from '@app/common/dtos';
import { Command } from '@app/common/enums';
import { User } from '@prisma/client'; // Import User type

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
    // Re-added explicit return type
    try {
      return await this.userService.updateUser(data.id, data.updateUserDto);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error as RpcException; // Explicitly cast to RpcException
      }
      // For any other type of error, wrap it in a new RpcException
      throw new RpcException('An unexpected error occurred');
    }
  }
}
