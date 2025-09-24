
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PermissionItem {
  [key: string]: string;
}

export class CreateBulkPermissionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionItem)
  data: PermissionItem[];
}
