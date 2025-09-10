import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from '@app/common/dtos';
import { Command } from '@app/common/enums';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern({ cmd: Command.CREATE_ROLE })
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @MessagePattern({ cmd: Command.FIND_ALL_ROLES })
  findAll() {
    return this.roleService.findAll();
  }

  @MessagePattern({ cmd: Command.FIND_ONE_ROLE })
  findOne(@Payload() id: number) {
    return this.roleService.findOne(id);
  }

  @MessagePattern({ cmd: Command.UPDATE_ROLE })
  update(@Payload() data: { id: number; updateRoleDto: UpdateRoleDto }) {
    return this.roleService.update(data.id, data.updateRoleDto);
  }

  @MessagePattern({ cmd: Command.REMOVE_ROLE })
  remove(@Payload() id: number) {
    return this.roleService.remove(id);
  }
}
