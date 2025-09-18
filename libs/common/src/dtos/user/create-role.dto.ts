import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '@app/common/enums';

export class CreateRoleDto {
  @IsEnum(Role)
  @IsNotEmpty()
  name: Role;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  permissions?: number[];
}
