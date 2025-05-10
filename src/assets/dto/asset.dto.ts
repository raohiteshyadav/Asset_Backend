import {
  IsArray,
  IsDateString,
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Status } from '../entities/laptop.entity';
import { Category } from '../entities/printer.entity';
import { Type } from 'class-transformer';

export class CreateApDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsDateString()
  @IsNotEmpty()
  warranty: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateCctvDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsIP()
  @IsNotEmpty()
  ipAddress: string;

  @IsDateString()
  @IsNotEmpty()
  warranty: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateDesktopDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  processor: string;

  @IsString()
  @IsNotEmpty()
  os: string;

  @IsString()
  @IsNotEmpty()
  ram: number;

  @IsString()
  @IsNotEmpty()
  storage: string;

  @IsString()
  @IsNotEmpty()
  storageType: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateHardDiskDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  capacity: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateIpPhoneDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsIP()
  @IsNotEmpty()
  ipAddress: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateLaptopBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLaptopDto)
  items: CreateLaptopDto[];
}

export class CreateLaptopDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  processor: string;

  @IsString()
  @IsNotEmpty()
  os: string;

  @IsNumber()
  @IsNotEmpty()
  ram: number;

  @IsString()
  @IsNotEmpty()
  storage: string;

  @IsString()
  @IsNotEmpty()
  storageType: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateNetworkDeviceDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsIP()
  @IsNotEmpty()
  ipAddress: string;

  @IsString()
  @IsNotEmpty()
  macAddress: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateNvrDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateOtherDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  assetType: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreatePrinterBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrinterDto)
  items: CreatePrinterDto[];
}

export class CreatePrinterDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateProjectorDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreatePunchMachineDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  macAddress: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}

export class CreateSwitchDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  snNumber: string;

  @IsString()
  @IsNotEmpty()
  poNumber: string;

  @IsString()
  @IsNotEmpty()
  macAddress: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;
}
