import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  level?: number;
}
