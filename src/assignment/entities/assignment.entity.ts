import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

export enum AssetType {
  AP = 'AP',
  CCTV = 'CCTV',
  DESKTOP = 'DESKTOP',
  HARD_DISK = 'HARD_DISK',
  IP_PHONE = 'IP_PHONE',
  LAPTOP = 'LAPTOP',
  NETWORK_DEVICE = 'NETWORK_DEVICE',
  NVR = 'NVR',
  OTHER = 'OTHER',
  PRINTER = 'PRINTER',
  PROJECTOR = 'PROJECTOR',
  PUNCH_MACHINE = 'PUNCH_MACHINE',
  SWITCH = 'SWITCH',
}

@Entity()
export class Assignment {
  @PrimaryKey()
  id!: number;

  @Property()
  empId: string;

  @Enum({ items: () => AssetType})
  assetType:AssetType;

  @Property()
  snNumber: string;

  @Property({ nullable: true, default: null })
  exactLocation?: string | null;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, default: null })
  returnedAt?: Date | null;

  @Property({ nullable: true, default: null })
  remark?: string | null;

  constructor({
    empId,
    assetType,
    snNumber,
    exactLocation,
    createdAt,
    returnedAt,
    remark,
  }: {
    empId: string;
    assetType: AssetType;
    snNumber: string;
    exactLocation?: string | null;
    createdAt?: Date;
    returnedAt?: Date;
    remark?: string|null;
  }) {
    this.empId = empId;
    this.assetType = assetType;
    this.snNumber = snNumber;
    this.exactLocation = exactLocation ?? null;
    this.createdAt = createdAt ?? new Date();
    this.returnedAt = returnedAt ?? null;
    this.remark = remark ?? null;
  }
}
