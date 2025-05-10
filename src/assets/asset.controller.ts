import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import {
  CreateLaptopDto,
  CreateDesktopDto,
  CreateApDto,
  CreateCctvDto,
  CreateHardDiskDto,
  CreateIpPhoneDto,
  CreateNetworkDeviceDto,
  CreateNvrDto,
  CreateOtherDto,
  CreatePrinterDto,
  CreateProjectorDto,
  CreatePunchMachineDto,
  CreateSwitchDto,
  CreatePrinterBulkDto,
  CreateLaptopBulkDto,
} from './dto/asset.dto';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('create-laptop')
  async createLaptop(@Body() dto: CreateLaptopDto): Promise<{
    message: string;
    LaptopNo: string;
    status: 201;
  }> {
    return this.assetService.createLaptop(dto);
  }

  @Post('create-laptop-bulk')
  async createLaptopBulk(
    @Body()
    dtos: CreateLaptopBulkDto,
  ): Promise<{
    message: string;
    skippedLaptops: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createLaptopBulk(dtos.items);
  }

  @Post('create-desktop')
  async createDesktop(@Body() dto: CreateDesktopDto): Promise<{
    message: string;
    DesktopNo: string;
    status: 201;
  }> {
    return this.assetService.createDesktop(dto);
  }

  @Post('create-desktop-bulk')
  async createDesktopBulk(@Body() dtos: CreateDesktopDto[]): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createDesktopBulk(dtos);
  }

  @Post('create-ap')
  async createAp(@Body() dto: CreateApDto): Promise<{
    message: string;
    ApNo: string;
    status: 201;
  }> {
    return this.assetService.createAp(dto);
  }

  @Post('create-ap-bulk')
  async createApBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateApDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createApBulk(dtos);
  }

  @Post('create-cctv')
  async createCctv(@Body() dto: CreateCctvDto): Promise<{
    message: string;
    Cctv: string;
    status: 201;
  }> {
    return this.assetService.createCctv(dto);
  }

  @Post('create-cctv-bulk')
  async createCctvBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateCctvDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createCctvBulk(dtos);
  }

  @Post('create-hard-disk')
  async createHardDisk(@Body() dto: CreateHardDiskDto): Promise<{
    message: string;
    HardDisk: string;
    status: 201;
  }> {
    return this.assetService.createHardDisk(dto);
  }

  @Post('create-hard-disk-bulk')
  async createHardDiskBulk(
    @Body()
    dtos: CreateHardDiskDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createHardDiskBulk(dtos);
  }

  @Post('create-ip-phone')
  async createIpPhone(@Body() dto: CreateIpPhoneDto): Promise<{
    message: string;
    IpPhone: string;
    status: 201;
  }> {
    return this.assetService.createIpPhone(dto);
  }

  @Post('create-ip-phone-bulk')
  async createIpPhoneBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateIpPhoneDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createIpPhoneBulk(dtos);
  }

  @Post('create-network-device')
  async createNetworkDevice(@Body() dto: CreateNetworkDeviceDto): Promise<{
    message: string;
    NetworkDevice: string;
    status: 201;
  }> {
    return this.assetService.createNetworkDevice(dto);
  }

  @Post('create-network-device-bulk')
  async createNetworkDeviceBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateNetworkDeviceDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createNetworkDeviceBulk(dtos);
  }

  @Post('create-nvr')
  async createNvr(@Body() dto: CreateNvrDto): Promise<{
    message: string;
    Nvr: string;
    status: 201;
  }> {
    return this.assetService.createNvr(dto);
  }

  @Post('create-nvr-bulk')
  async createNvrBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateNvrDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createNvrBulk(dtos);
  }

  @Post('create-other')
  async createOther(@Body() dto: CreateOtherDto): Promise<{
    message: string;
    Other: string;
    status: 201;
  }> {
    return this.assetService.createOther(dto);
  }

  @Post('create-other-bulk')
  async createOtherBulk(@Body() dtos: CreateOtherDto[]): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createOtherBulk(dtos);
  }

  @Post('create-printer')
  async createPrinter(@Body() dto: CreatePrinterDto): Promise<{
    message: string;
    Printer: string;
    status: 201;
  }> {
    return this.assetService.createPrinter(dto);
  }

  @Post('create-printer-bulk')
  async createPrinterBulk(@Body() dtos: CreatePrinterBulkDto): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createPrinterBulk(dtos.items);
  }

  @Post('create-projector')
  async createProjector(@Body() dto: CreateProjectorDto): Promise<{
    message: string;
    Projector: string;
    status: 201;
  }> {
    return this.assetService.createProjector(dto);
  }

  @Post('create-projector-bulk')
  async createProjectorBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateProjectorDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createProjectorBulk(dtos);
  }

  @Post('create-punch-machine')
  async createPunchMachine(@Body() dto: CreatePunchMachineDto): Promise<{
    message: string;
    PunchMachine: string;
    status: 201;
  }> {
    return this.assetService.createPunchMachine(dto);
  }

  @Post('create-punch-machine-bulk')
  async createPunchMachineBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreatePunchMachineDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createPunchMachineBulk(dtos);
  }

  @Post('create-switch')
  async createSwitch(@Body() dto: CreateSwitchDto): Promise<{
    message: string;
    Switch: string;
    status: 201;
  }> {
    return this.assetService.createSwitch(dto);
  }

  @Post('create-switch-bulk')
  async createSwitchBulk(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dtos: CreateSwitchDto[],
  ): Promise<{
    message: string;
    skippedItems: string[];
    createdCount: number;
    skippedCount: number;
    status: 201;
  }> {
    return this.assetService.createSwitchBulk(dtos);
  }

  @Get('stats')
  async getAllStats() {
    return this.assetService.getAllAssetStats();
  }
}
