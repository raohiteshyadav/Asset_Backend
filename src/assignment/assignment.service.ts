import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignmentDto, ReturnAssignmentDto } from './dto/assignment.dto';
import { AssetType, Assignment } from './entities/assignment.entity';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { Laptop } from 'src/assets/entities/laptop.entity';
import { Desktop } from 'src/assets/entities/desktop.entity';
import { Ap } from 'src/assets/entities/ap.entity';
import { Cctv } from 'src/assets/entities/cctv.entity';
import { HardDisk } from 'src/assets/entities/hardDisk.entity';
import { IpPhone } from 'src/assets/entities/ipPhone.entity';
import { NetworkDevice } from 'src/assets/entities/networkDevice.entity';
import { Nvr } from 'src/assets/entities/nvr.entity';
import { Other } from 'src/assets/entities/other.entity';
import { Printer } from 'src/assets/entities/printer.entity';
import { Projector } from 'src/assets/entities/projector.entity';
import { PunchMachine } from 'src/assets/entities/punchMachine.entity';
import { Switch } from 'src/assets/entities/switch.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Ap)
    private readonly apRepo: EntityRepository<Ap>,

    @InjectRepository(Cctv)
    private readonly cctvRepo: EntityRepository<Cctv>,

    @InjectRepository(HardDisk)
    private readonly hardDiskRepo: EntityRepository<HardDisk>,

    @InjectRepository(IpPhone)
    private readonly ipPhoneRepo: EntityRepository<IpPhone>,

    @InjectRepository(NetworkDevice)
    private readonly networkDeviceRepo: EntityRepository<NetworkDevice>,

    @InjectRepository(Nvr)
    private readonly nvrRepo: EntityRepository<Nvr>,

    @InjectRepository(Other)
    private readonly otherRepo: EntityRepository<Other>,

    @InjectRepository(Printer)
    private readonly printerRepo: EntityRepository<Printer>,

    @InjectRepository(Projector)
    private readonly projectorRepo: EntityRepository<Projector>,

    @InjectRepository(PunchMachine)
    private readonly punchMachineRepo: EntityRepository<PunchMachine>,

    @InjectRepository(Switch)
    private readonly switchRepo: EntityRepository<Switch>,

    @InjectRepository(Desktop)
    private readonly desktopRepo: EntityRepository<Desktop>,

    @InjectRepository(Laptop)
    private readonly laptopRepo: EntityRepository<Laptop>,

    @InjectRepository(Assignment)
    private readonly assignmentRepo: EntityRepository<Assignment>,
    private readonly em: EntityManager,
  ) {}

  async assignAsset(dto: CreateAssignmentDto) {
    try {
      const alreadyAssigned = await this.assignmentRepo.findOne({
        assetType: dto.assetType,
        snNumber: dto.snNumber,
        returnedAt: null,
      });

      if (alreadyAssigned) {
        throw new ConflictException({
          statusCode: 400,
          message: `Asset ${dto.assetType} [${dto.snNumber}] is already assigned.`,
          error: 'Bad Request',
        });
      }
      const assignment = new Assignment({
        empId: dto.empId,
        assetType: dto.assetType,
        snNumber: dto.snNumber,
        exactLocation: dto.exactLocation ?? '',
        remark: dto.remark ?? '',
      });
      await this.em.persistAndFlush(assignment);

      return {
        message: 'Asset assigned successfully!',
        assetSn: assignment.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('Error in assigning asset:', error);
      throw error;
    }
  }

  private async findActiveAssignment(id: number, assetType: AssetType) {
    const assignment = await this.assignmentRepo.findOne({
      id,
      assetType,
      returnedAt: null,
    });

    if (!assignment) {
      throw new ConflictException({
        statusCode: 400,
        message: `Asset ${assetType} with ID ${id} is not currently assigned or already returned.`,
        error: 'Bad Request',
      });
    }

    return assignment;
  }

  async returnAsset(dto: ReturnAssignmentDto) {
    const assignment = await this.findActiveAssignment(dto.id, dto.assetType);
    try {
      assignment.returnedAt = new Date();

      await this.em.persistAndFlush(assignment);
      return {
        message: `Asset ${dto.assetType} [${dto.id}] successfully returned.`,
        returnedAt: assignment.returnedAt,
      };
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: `Failed to record return of asset ${dto.assetType} [${dto.id}].`,
        error: err.message,
      });
    }
  }

  async getAssignmentsByEmployeeId(
    employeeId: string,
  ): Promise<Assignment[]> {
    let assignments: Assignment[] = [];
    if (!employeeId || typeof employeeId !== 'string') {
      throw new BadRequestException('Invalid employee ID provided.');
    }

    try {
      assignments = await this.assignmentRepo.find({
        empId: employeeId,
        returnedAt: null,
      });
      if (!assignments || assignments.length === 0) {
        throw new NotFoundException(
          `No active assignments found for employee ID: ${employeeId}`,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not fetch assignments at this time',
      );
    }

    return assignments;
  }

  async getAssignmentAssetDetails(id: number) {
    const assignment = await this.assignmentRepo.findOne({ id });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    let assetDetails: any;

    switch (assignment.assetType) {
      case AssetType.LAPTOP:
        assetDetails = await this.laptopRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.DESKTOP:
        assetDetails = await this.desktopRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.AP:
        assetDetails = await this.apRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.CCTV:
        assetDetails = await this.cctvRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.HARD_DISK:
        assetDetails = await this.hardDiskRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.IP_PHONE:
        assetDetails = await this.ipPhoneRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.NETWORK_DEVICE:
        assetDetails = await this.networkDeviceRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.NVR:
        assetDetails = await this.nvrRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.OTHER:
        assetDetails = await this.otherRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.PRINTER:
        assetDetails = await this.printerRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.PROJECTOR:
        assetDetails = await this.projectorRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.PUNCH_MACHINE:
        assetDetails = await this.punchMachineRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      case AssetType.SWITCH:
        assetDetails = await this.switchRepo.findOne({
          snNumber: assignment.snNumber,
        });
        break;

      default:
        throw new BadRequestException(
          `Unsupported asset type ${assignment.assetType}`,
        );
    }

    if (!assetDetails) {
      throw new NotFoundException(
        `Asset details not found for SN ${assignment.snNumber}`,
      );
    }

    return {
      assignmentId: assignment.id,
      empId: assignment.empId,
      assetType: assignment.assetType,
      snNumber: assignment.snNumber,
      assetDetails: assetDetails,
    };
  }

  async getAssets(assetType: AssetType, page: number, limit: number) {
    const offset = (page - 1) * limit;
  
    if (!assetType) {
      throw new BadRequestException('Select any one type of asset');
    }
  
    let repo: EntityRepository<any>;
  
    switch (assetType) {
      case AssetType.LAPTOP:
        repo = this.laptopRepo;
        break;
      case AssetType.DESKTOP:
        repo = this.desktopRepo;
        break;
      case AssetType.AP:
        repo = this.apRepo;
        break;
      case AssetType.CCTV:
        repo = this.cctvRepo;
        break;
      case AssetType.HARD_DISK:
        repo = this.hardDiskRepo;
        break;
      case AssetType.IP_PHONE:
        repo = this.ipPhoneRepo;
        break;
      case AssetType.NETWORK_DEVICE:
        repo = this.networkDeviceRepo;
        break;
      case AssetType.NVR:
        repo = this.nvrRepo;
        break;
      case AssetType.OTHER:
        repo = this.otherRepo;
        break;
      case AssetType.PRINTER:
        repo = this.printerRepo;
        break;
      case AssetType.PROJECTOR:
        repo = this.projectorRepo;
        break;
      case AssetType.PUNCH_MACHINE:
        repo = this.punchMachineRepo;
        break;
      case AssetType.SWITCH:
        repo = this.switchRepo;
        break;
      default:
        throw new BadRequestException(`Unsupported asset type: ${assetType}`);
    }
  
    const [assets, totalCount] = await Promise.all([
      repo.findAll({ limit, offset }),
      repo.count(),
    ]);
  
    return {
      assets,
      totalCount,
    };
  }

}
