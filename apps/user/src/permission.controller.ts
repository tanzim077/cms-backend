import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from '@app/common/dtos';
import { Command } from '@app/common/enums';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @MessagePattern({ cmd: Command.CREATE_PERMISSION })
  create(@Payload() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @MessagePattern({ cmd: Command.FIND_ALL_PERMISSIONS })
  findAll() {
    return this.permissionService.findAll();
  }

  @MessagePattern({ cmd: Command.FIND_ONE_PERMISSION })
  findOne(@Payload() id: number) {
    return this.permissionService.findOne(id);
  }

  @MessagePattern({ cmd: Command.UPDATE_PERMISSION })
  update(
    @Payload() data: { id: number; updatePermissionDto: UpdatePermissionDto },
  ) {
    return this.permissionService.update(data.id, data.updatePermissionDto);
  }

  @MessagePattern({ cmd: Command.REMOVE_PERMISSION })
  remove(@Payload() id: number) {
    return this.permissionService.remove(id);
  }
}
