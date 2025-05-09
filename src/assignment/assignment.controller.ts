import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto, ReturnAssignmentDto } from './dto/assignment.dto';
import { Assignment } from './entities/assignment.entity';

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

  @Post('return')
  async returnAsset(@Body() dto: ReturnAssignmentDto): Promise<{
    message: string;
    returnedAt: Date;
  }> {
    return this.assignmentService.returnAsset(dto);
  }

  @Get(':employeeId/active')
  async getAssignmentByEmloyee(
    @Param('employeeId') empId: string,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentsByEmployeeId(empId);
  }

  @Get(':id/details')
  async getAssignmentAssetDetails(@Param('id') id: number): Promise<any> {
    return this.assignmentService.getAssignmentAssetDetails(id);
  }
}
