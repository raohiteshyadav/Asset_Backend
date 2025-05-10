import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto, ReturnAssignmentDto } from './dto/assignment.dto';
import { AssetType, Assignment } from './entities/assignment.entity';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post('')
  async assignAsset(@Body() dto: CreateAssignmentDto): Promise<{
    message: string;
    assetSn: string;
    status: 201;
  }> {
    return this.assignmentService.assignAsset(dto);
  }

  @Get('assets')
  async getAssets(
    @Query('assetType') assetType: AssetType,
    @Query('page') page = 1,
    @Query('limit') limit = 8,
  ) {
    if (!assetType) {
      throw new BadRequestException('Asset type is required.');
    }

    return this.assignmentService.getAssets(assetType, +page, +limit);
  }

  @Post('return')
  async returnAsset(@Body() dto: ReturnAssignmentDto): Promise<{
    message: string;
    returnedAt: Date;
  }> {
    return this.assignmentService.returnAsset(dto);
  }

  @Get('active/:employeeId')
  async getAssignmentByEmloyee(
    @Param('employeeId') empId: string,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentsByEmployeeId(empId);
  }

  @Get('details/:id')
  async getAssignmentAssetDetails(@Param('id') id: number): Promise<any> {
    return this.assignmentService.getAssignmentAssetDetails(id);
  }
}
