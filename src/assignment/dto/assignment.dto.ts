import {
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
} from 'class-validator';
import { AssetType } from '../entities/assignment.entity';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  empId!: string;

  @IsEnum(AssetType)
  assetType: AssetType;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsOptional()
  exactLocation?: string;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class ReturnAssignmentDto {
  @IsInt()
  id: number;

  @IsEnum(AssetType)
  assetType: AssetType;
}
