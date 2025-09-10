import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { CreatePermissionDto, UpdatePermissionDto } from '@app/common/dtos';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PermissionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      return await this.databaseService.permission.create({
        data: createPermissionDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new RpcException({
          status: 409,
          message: 'Permission already exists',
        });
      }
      throw error;
    }
  }

  async findAll() {
    return this.databaseService.permission.findMany();
  }

  async findOne(id: number) {
    const permission = await this.databaseService.permission.findUnique({
      where: { id },
    });
    if (!permission) {
      throw new RpcException({ status: 404, message: 'Permission not found' });
    }
    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      return await this.databaseService.permission.update({
        where: { id },
        data: updatePermissionDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new RpcException({
          status: 404,
          message: 'Permission not found',
        });
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.permission.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new RpcException({
          status: 404,
          message: 'Permission not found',
        });
      }
      throw error;
    }
  }
}
