import { Migration } from '@mikro-orm/migrations';

export class Migration20250418112634 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "desktop" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "processor" varchar(255) not null, "os" varchar(255) not null, "ram" int not null, "storage" varchar(255) not null, "storage_type" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "description" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`alter table "ap" rename column "desciption" to "description";`);

    this.addSql(`alter table "cctv" rename column "desciption" to "description";`);

    this.addSql(`alter table "hard_disk" rename column "desciption" to "description";`);

    this.addSql(`alter table "ip_phone" rename column "desciption" to "description";`);

    this.addSql(`alter table "network_device" rename column "desciption" to "description";`);

    this.addSql(`alter table "nvr" rename column "desciption" to "description";`);

    this.addSql(`alter table "other" rename column "desciption" to "description";`);

    this.addSql(`alter table "printer" rename column "desciption" to "description";`);

    this.addSql(`alter table "projector" rename column "desciption" to "description";`);

    this.addSql(`alter table "punch_machine" rename column "desciption" to "description";`);

    this.addSql(`alter table "switch" rename column "desciption" to "description";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "dekstop" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "processor" varchar(255) not null, "os" varchar(255) not null, "ram" int not null, "storage" varchar(255) not null, "storage_type" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`alter table "ap" rename column "description" to "desciption";`);

    this.addSql(`alter table "cctv" rename column "description" to "desciption";`);

    this.addSql(`alter table "hard_disk" rename column "description" to "desciption";`);

    this.addSql(`alter table "ip_phone" rename column "description" to "desciption";`);

    this.addSql(`alter table "network_device" rename column "description" to "desciption";`);

    this.addSql(`alter table "nvr" rename column "description" to "desciption";`);

    this.addSql(`alter table "other" rename column "description" to "desciption";`);

    this.addSql(`alter table "printer" rename column "description" to "desciption";`);

    this.addSql(`alter table "projector" rename column "description" to "desciption";`);

    this.addSql(`alter table "punch_machine" rename column "description" to "desciption";`);

    this.addSql(`alter table "switch" rename column "description" to "desciption";`);
  }

}
