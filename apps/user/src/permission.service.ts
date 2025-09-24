import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import {
  CreateBulkPermissionDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from '@app/common/dtos';
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

  async createBulk(createPermissionDto: CreateBulkPermissionDto) {
    const { data } = createPermissionDto;

    const permissions = data.map((permission) => {
      const [, code] = Object.entries(permission)[0];
      return { code };
    });

    // Insert in bulk, skip duplicates based on unique constraints in schema
    await this.databaseService.permission.createMany({
      data: permissions,
      skipDuplicates: true, // ensures no duplicate insertions
    });

    // Return the permissions that now exist (including newly created)
    return this.databaseService.permission.findMany({
      where: {
        code: { in: permissions.map((p) => p.code) },
      },
    });
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
