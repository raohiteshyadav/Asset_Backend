import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum Category {
  OWN = 'own',
  RENTAL = 'rental',
}

@Entity()
export class Printer {
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
  createdAt = new Date();

  @Property({ columnType: 'text', default: null, nullable: true })
  vendor?: string|null;

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
    vendor?: string|null;
    location: string;
    description: string;
    status: Status;
    category: Category;
  }) {
    this.brand = brand;
    this.model = model;
    this.snNumber = snNumber;
    this.poNumber = poNumber;
    this.vendor = vendor??null;
    this.location = location;
    this.description = description;
    this.status = status;
    this.category = category;
  }
}
