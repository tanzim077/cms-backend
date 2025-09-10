import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdatePermissionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  level?: number;
}
