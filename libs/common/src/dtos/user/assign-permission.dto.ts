import { IsNumber, IsNotEmpty } from 'class-validator';

export class AssignPermissionDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  permissionId: number;
}
