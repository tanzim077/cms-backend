import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { UpdateUserDto } from '@app/common/dtos';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client'; // Import User type
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
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
}
