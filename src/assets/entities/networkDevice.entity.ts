import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Category } from './printer.entity';

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }

@Entity()
export class NetworkDevice {
  @PrimaryKey()
  id!: number;

  @Property()
  brand: string;

  @Property()
  model: string;

  @Property()
  @Unique()
  snNumber: string;

  @Property()
  poNumber: string;

  @Property()
  ipAddress: string;

  @Property()
  macAddress: string;

  @Property()
  createdAt = new Date();

  @Property({ columnType: 'text', default: null, nullable: true })
  vendor: string;

  @Property({ columnType: 'text', default: null, nullable: true })
  location: string;

  @Property({ columnType: 'text', default: null, nullable: true })
  description: string;

  @Enum({items :() => Status, default:Status.ACTIVE})
  status: Status;

  @Enum({items:()=>Category,default:Category.OWN})
  category: Category;

  constructor({
      brand,
      model,
      snNumber,
      poNumber,
      ipAddress,
      macAddress,
      vendor,
      location,
      description,
      status,
      category,
    }: {
      brand: string;
      model: string;
      snNumber: string;
      poNumber: string;
      ipAddress: string;
      macAddress: string;
      vendor: string;
      location: string;
      description: string;
      status: Status;
      category:Category;
    }) {
      this.brand = brand;
      this.model = model;
      this.snNumber = snNumber;
      this.poNumber = poNumber;
      this.ipAddress=ipAddress;
      this.macAddress=macAddress;
      this.vendor = vendor;
      this.location = location;
      this.description = description;
      this.status = status;
      this.category=category;
    }

}
