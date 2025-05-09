import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Category } from './printer.entity';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Desktop {
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
  processor: string;

  @Property()
  os: string;

  @Property()
  ram: number;

  @Property()
  storage: string;

  @Property()
  storageType: string;

  @Property({ default: null })
  createdAt = new Date();

  @Property({ columnType: 'text', default: null, nullable: true })
  vendor: string;

  @Property({ columnType: 'text', default: null, nullable: true })
  location: string;

  @Property({ columnType: 'text', default: null, nullable: true })
  description: string;

  @Enum({ items: () => Status, default: Status.ACTIVE })
  status: Status;

  @Enum({ items: () => Category, default: Category.OWN })
  category: Category;
  constructor({
    brand,
    model,
    snNumber,
    poNumber,
    processor,
    os,
    ram,
    storage,
    storageType,
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
    processor: string;
    os: string;
    ram: number;
    storage: string;
    storageType: string;
    vendor: string;
    location: string;
    description: string;
    status: Status;
    category: Category;
  }) {
    this.brand = brand;
    this.model = model;
    this.snNumber = snNumber;
    this.poNumber = poNumber;
    this.processor = processor;
    this.os = os;
    this.ram = ram;
    this.storage = storage;
    this.storageType = storageType;
    this.vendor = vendor;
    this.location = location;
    this.description = description;
    this.status = status;
    this.category = category;
  }
}
