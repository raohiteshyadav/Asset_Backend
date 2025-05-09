import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import {
  CreateApDto,
  CreateCctvDto,
  CreateDesktopDto,
  CreateHardDiskDto,
  CreateIpPhoneDto,
  CreateLaptopDto,
  CreateNetworkDeviceDto,
  CreateNvrDto,
  CreateOtherDto,
  CreatePrinterDto,
  CreateProjectorDto,
  CreatePunchMachineDto,
  CreateSwitchDto,
} from './dto/asset.dto';
import { Laptop, Status } from './entities/laptop.entity';
import { Desktop } from './entities/desktop.entity';
import { Ap } from './entities/ap.entity';
import { Cctv } from './entities/cctv.entity';
import { HardDisk } from './entities/hardDisk.entity';
import { IpPhone } from './entities/ipPhone.entity';
import { NetworkDevice } from './entities/networkDevice.entity';
import { Nvr } from './entities/nvr.entity';
import { Other } from './entities/other.entity';
import { Category, Printer } from './entities/printer.entity';
import { Projector } from './entities/projector.entity';
import { PunchMachine } from './entities/punchMachine.entity';
import { Switch } from './entities/switch.entity';
import {
  AssetType,
  Assignment,
} from 'src/assignment/entities/assignment.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Laptop)
    private readonly laptopRepo: EntityRepository<Laptop>,
    @InjectRepository(Desktop)
    private readonly desktopRepo: EntityRepository<Desktop>,
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
    @InjectRepository(Assignment)
    private readonly assignmentRepo: EntityRepository<Assignment>,
    private readonly em: EntityManager,
  ) {}

  async getAssetStats(
    assetType: AssetType,
    assetRepo: EntityRepository<any>,
  ): Promise<{ type: AssetType; assigned: number; active: number }> {
    try {
      const [assignedCount, activeCount] = await Promise.all([
        this.assignmentRepo.count({
          assetType,
          returnedAt: null,
        }),
        assetRepo.count({
          status: Status.ACTIVE,
        })
      ]);

      return { type: assetType, assigned: assignedCount, active: activeCount };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch statistics for asset type: ${assetType}`,
      );
    }
  }

  async getAllAssetStats(): Promise<
    { type: AssetType; assigned: number; active: number }[]
  > {
    return Promise.all([
      this.getAssetStats(AssetType.AP, this.apRepo),
      this.getAssetStats(AssetType.CCTV, this.cctvRepo),
      this.getAssetStats(AssetType.DESKTOP, this.desktopRepo),
      this.getAssetStats(AssetType.HARD_DISK, this.hardDiskRepo),
      this.getAssetStats(AssetType.IP_PHONE, this.ipPhoneRepo),
      this.getAssetStats(AssetType.LAPTOP, this.laptopRepo),
      this.getAssetStats(AssetType.NETWORK_DEVICE, this.networkDeviceRepo),
      this.getAssetStats(AssetType.NVR, this.nvrRepo),
      this.getAssetStats(AssetType.OTHER, this.otherRepo),
      this.getAssetStats(AssetType.PRINTER, this.printerRepo),
      this.getAssetStats(AssetType.PROJECTOR, this.projectorRepo),
      this.getAssetStats(AssetType.PUNCH_MACHINE, this.punchMachineRepo),
      this.getAssetStats(AssetType.SWITCH, this.switchRepo),
    ]);
  }
  
  private async bulkCreate<T extends { snNumber: string }>(
    dtos: T[],
    repo: EntityRepository<any>,
    entityCreator: (dto: T) => any,
    label: string,
  ) {
    const items: any[] = [];
    const skipped: string[] = [];

    for (const dto of dtos) {
      const exists = await repo.findOne({ snNumber: dto.snNumber });
      if (exists) {
        skipped.push(dto.snNumber);
        continue;
      }
      items.push(entityCreator(dto));
    }

    try {
      if (items.length > 0) {
        await this.em.begin();
        await this.em.persistAndFlush(items);
        await this.em.commit();
      }

      return {
        message: `${items.length} ${label} created successfully`,
        skippedItems: skipped,
        createdCount: items.length,
        skippedCount: skipped.length,
        status: 201 as const,
      };
    } catch (err) {
      await this.em.rollback();
      throw err;
    }
  }
  async createLaptop(dto: CreateLaptopDto) {
    try {
      const existing = await this.em.findOne(Laptop, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Laptop with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const laptop = new Laptop({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        processor: dto.processor,
        os: dto.os,
        ram: dto.ram,
        storage: dto.storage,
        storageType: dto.storageType,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });

      await this.em.persistAndFlush(laptop);

      return {
        message: 'Laptop Created Successfully!',
        LaptopNo: laptop.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating laptop:', error);
      throw error;
    }
  }
  async createLaptopBulk(dtos: CreateLaptopDto[]) {
    const laptops: Laptop[] = [];
    const skippedLaptops: string[] = [];

    for (const dto of dtos) {
      //bhut jyada duplicacy hogyi to ye in efficient bhi h to acha ye rhega ki phle hi hm sbb kuch nikal le array me
      const existingLaptop = await this.laptopRepo.findOne({
        snNumber: dto.snNumber,
      });
      if (existingLaptop) {
        skippedLaptops.push(dto.snNumber);
        continue;
      }
      const laptop = new Laptop({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        processor: dto.processor,
        os: dto.os,
        ram: dto.ram,
        storage: dto.storage,
        storageType: dto.storageType,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      laptops.push(laptop);
    }

    try {
      if (laptops.length > 0) {
        await this.em.begin();
        await this.em.persistAndFlush(laptops);
        await this.em.commit();
      }

      return {
        message: `${laptops.length} laptops created successfully`,
        skippedLaptops: skippedLaptops,
        createdCount: laptops.length,
        skippedCount: skippedLaptops.length,
        status: 201 as const,
      };
    } catch (error) {
      console.error('Error creating laptops in bulk:', error);
      await this.em.rollback();
      throw error;
    }
  }
  async createDesktop(dto: CreateDesktopDto) {
    try {
      const existing = await this.em.findOne(Desktop, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Desktop with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const desktop = new Desktop({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        processor: dto.processor,
        os: dto.os,
        ram: dto.ram,
        storage: dto.storage,
        storageType: dto.storageType,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });

      await this.em.persistAndFlush(desktop);

      return {
        message: 'Desktop Created Successfully!',
        DesktopNo: desktop.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating desktop:', error);
      throw error;
    }
  }
  async createAp(dto: CreateApDto) {
    try {
      const existing = await this.em.findOne(Ap, { snNumber: dto.snNumber });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Ap with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const ap = new Ap({
        brand: dto.brand,
        model: dto.model,
        ipAddress: dto.ipAddress,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(ap);

      return {
        message: 'Ap Created Successfully!',
        ApNo: ap.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating ap:', error);
      throw error;
    }
  }
  async createCctv(dto: CreateCctvDto) {
    try {
      const existing = await this.em.findOne(Cctv, { snNumber: dto.snNumber });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `CCTV with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const cctv = new Cctv({
        brand: dto.brand,
        model: dto.model,
        ipAddress: dto.ipAddress,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(cctv);
      return {
        message: 'Cctv Created Successfully!',
        Cctv: cctv.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating cctv', error);
      throw error;
    }
  }
  async createHardDisk(dto: CreateHardDiskDto) {
    try {
      const existing = await this.em.findOne(HardDisk, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `HardDisk with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const hardDisk = new HardDisk({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        capacity: dto.capacity,
        category: dto.category,
      });
      await this.em.persistAndFlush(hardDisk);
      return {
        message: 'HardDisk Created Successfully!',
        HardDisk: hardDisk.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating HardDisk', error);
      throw error;
    }
  }
  async createIpPhone(dto: CreateIpPhoneDto) {
    try {
      const existing = await this.em.findOne(IpPhone, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `IpPhone with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const ipPhone = new IpPhone({
        brand: dto.brand,
        model: dto.model,
        ipAddress: dto.ipAddress,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(ipPhone);
      return {
        message: 'IpPhone Created Successfully!',
        IpPhone: ipPhone.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating ipPhone', error);
      throw error;
    }
  }
  async createNetworkDevice(dto: CreateNetworkDeviceDto) {
    try {
      const existing = await this.em.findOne(NetworkDevice, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Network Device with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const networkDevice = new NetworkDevice({
        brand: dto.brand,
        model: dto.model,
        ipAddress: dto.ipAddress,
        macAddress: dto.macAddress,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(networkDevice);
      return {
        message: 'Network Device Created Successfully!',
        NetworkDevice: networkDevice.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Network Device', error);
      throw error;
    }
  }
  async createNvr(dto: CreateNvrDto) {
    try {
      const existing = await this.em.findOne(Nvr, { snNumber: dto.snNumber });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Nvr with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const nvr = new Nvr({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(nvr);
      return {
        message: 'Nvr Created Successfully!',
        Nvr: nvr.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Nvr', error);
      throw error;
    }
  }
  async createOther(dto: CreateOtherDto) {
    try {
      const existing = await this.em.findOne(Other, { snNumber: dto.snNumber });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Other with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const other = new Other({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(other);
      return {
        message: 'Other items Created Successfully!',
        Other: other.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Other', error);
      throw error;
    }
  }
  async createPrinter(dto: CreatePrinterDto) {
    try {
      const existing = await this.em.findOne(Printer, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Printer with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }

      const printer = new Printer({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(printer);
      return {
        message: 'Printer Created Successfully!',
        Printer: printer.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Printer', error);
      throw error;
    }
  }
  async createProjector(dto: CreateProjectorDto) {
    try {
      const existing = await this.em.findOne(Projector, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Projector with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const projector = new Projector({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(projector);
      return {
        message: 'Projector Created Successfully!',
        Projector: projector.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Projector', error);
      throw error;
    }
  }
  async createPunchMachine(dto: CreatePunchMachineDto) {
    try {
      const existing = await this.em.findOne(PunchMachine, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Punch machine with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const punchMachine = new PunchMachine({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(punchMachine);
      return {
        message: 'Punch Machine Created Successfully!',
        PunchMachine: punchMachine.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Punch Machine', error);
      throw error;
    }
  }
  async createSwitch(dto: CreateSwitchDto) {
    try {
      const existing = await this.em.findOne(Switch, {
        snNumber: dto.snNumber,
      });

      if (existing) {
        throw new ConflictException({
          statusCode: 400,
          message: `Switch with serial number '${dto.snNumber}' already exists.`,
          error: 'Bad Request',
        });
      }
      const switche = new Switch({
        brand: dto.brand,
        model: dto.model,
        snNumber: dto.snNumber,
        poNumber: dto.poNumber,
        macAddress: dto.macAddress,
        vendor: dto.vendor || '',
        location: dto.location,
        description: dto.description || '',
        status: dto.status as Status,
        category: dto.category as Category,
      });
      await this.em.persistAndFlush(switche);
      return {
        message: 'Punch Machine Created Successfully!',
        Switch: switche.snNumber,
        status: 201 as const,
      };
    } catch (error) {
      console.error('❌ Error creating Switch', error);
      throw error;
    }
  }
  async createDesktopBulk(dtos: CreateDesktopDto[]) {
    return this.bulkCreate(
      dtos,
      this.desktopRepo,
      (dto) =>
        new Desktop({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          processor: dto.processor,
          os: dto.os,
          ram: dto.ram,
          storage: dto.storage,
          storageType: dto.storageType,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Desktops',
    );
  }
  async createApBulk(dtos: CreateApDto[]) {
    return this.bulkCreate(
      dtos,
      this.apRepo,
      (dto) =>
        new Ap({
          brand: dto.brand,
          model: dto.model,
          ipAddress: dto.ipAddress,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Access Points',
    );
  }
  async createCctvBulk(dtos: CreateCctvDto[]) {
    return this.bulkCreate(
      dtos,
      this.cctvRepo,
      (dto) =>
        new Cctv({
          brand: dto.brand,
          model: dto.model,
          ipAddress: dto.ipAddress,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'CCTVs',
    );
  }
  async createHardDiskBulk(dtos: CreateHardDiskDto[]) {
    return this.bulkCreate(
      dtos,
      this.hardDiskRepo,
      (dto) =>
        new HardDisk({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          capacity: dto.capacity,
          category: dto.category as Category,
        }),
      'Hard Disks',
    );
  }
  async createIpPhoneBulk(dtos: CreateIpPhoneDto[]) {
    return this.bulkCreate(
      dtos,
      this.ipPhoneRepo,
      (dto) =>
        new IpPhone({
          brand: dto.brand,
          model: dto.model,
          ipAddress: dto.ipAddress,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'IP Phones',
    );
  }
  async createNetworkDeviceBulk(dtos: CreateNetworkDeviceDto[]) {
    return this.bulkCreate(
      dtos,
      this.networkDeviceRepo,
      (dto) =>
        new NetworkDevice({
          brand: dto.brand,
          model: dto.model,
          ipAddress: dto.ipAddress,
          macAddress: dto.macAddress || '',
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Network Devices',
    );
  }
  async createNvrBulk(dtos: CreateNvrDto[]) {
    return this.bulkCreate(
      dtos,
      this.nvrRepo,
      (dto) =>
        new Nvr({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'NVRs',
    );
  }
  async createOtherBulk(dtos: CreateOtherDto[]) {
    return this.bulkCreate(
      dtos,
      this.otherRepo,
      (dto) =>
        new Other({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Others',
    );
  }
  async createPrinterBulk(dtos: CreatePrinterDto[]) {
    return this.bulkCreate(
      dtos,
      this.printerRepo,
      (dto) =>
        new Printer({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Printers',
    );
  }
  async createProjectorBulk(dtos: CreateProjectorDto[]) {
    return this.bulkCreate(
      dtos,
      this.projectorRepo,
      (dto) =>
        new Projector({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Projectors',
    );
  }
  async createPunchMachineBulk(dtos: CreatePunchMachineDto[]) {
    return this.bulkCreate(
      dtos,
      this.punchMachineRepo,
      (dto) =>
        new PunchMachine({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Punch Machines',
    );
  }
  async createSwitchBulk(dtos: CreateSwitchDto[]) {
    return this.bulkCreate(
      dtos,
      this.switchRepo,
      (dto) =>
        new Switch({
          brand: dto.brand,
          model: dto.model,
          snNumber: dto.snNumber,
          poNumber: dto.poNumber,
          macAddress: dto.macAddress || '',
          vendor: dto.vendor || '',
          location: dto.location,
          description: dto.description || '',
          status: dto.status as Status,
          category: dto.category as Category,
        }),
      'Switches',
    );
  }
}
