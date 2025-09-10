import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '@app/common/enums';

export class UpdateRoleDto {
  @IsEnum(Role)
  @IsOptional()
  @IsNotEmpty()
  name?: Role;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
