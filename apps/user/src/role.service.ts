import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { CreateRoleDto, UpdateRoleDto } from '@app/common/dtos';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RoleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.databaseService.role.create({
        data: createRoleDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new RpcException({ status: 409, message: 'Role already exists' });
      }
      throw error;
    }
  }

  async findAll() {
    return this.databaseService.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.databaseService.role.findUnique({ where: { id } });
    if (!role) {
      throw new RpcException({ status: 404, message: 'Role not found' });
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.databaseService.role.update({
        where: { id },
        data: updateRoleDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new RpcException({ status: 404, message: 'Role not found' });
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.role.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new RpcException({ status: 404, message: 'Role not found' });
      }
      throw error;
    }
  }
}
