import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignPermissionToRoleDto {
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsNumber()
  @IsNotEmpty()
  permissionId: number;
}
