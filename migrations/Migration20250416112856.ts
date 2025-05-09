import { Migration } from '@mikro-orm/migrations';

export class Migration20250416112856 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "ap" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "ip_address" varchar(255) not null, "created_at" timestamptz not null, "warranty" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "cctv" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "ip_address" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "dekstop" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "processor" varchar(255) not null, "os" varchar(255) not null, "ram" varchar(255) not null, "storage" varchar(255) not null, "storage_type" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "hard_disk" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "capacity" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "ip_phone" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "ip_address" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "laptop" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "processor" varchar(255) not null, "os" varchar(255) not null, "ram" varchar(255) not null, "storage" varchar(255) not null, "storage_type" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "network_device" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "ip_address" varchar(255) not null, "mac_address" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "nvr" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "other" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "asset_type" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "printer" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "projector" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "punch_machine" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "mac_address" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "switch" ("id" serial primary key, "brand" varchar(255) not null, "model" varchar(255) not null, "sn_number" varchar(255) not null, "po_number" varchar(255) not null, "mac_address" varchar(255) not null, "created_at" timestamptz not null, "vendor" text null, "location" text not null, "desciption" text null, "status" text check ("status" in ('active', 'inactive')) not null);`);

    this.addSql(`create table "user" ("id" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) null, "contact" varchar(255) null, "department" varchar(255) null, "passkey" varchar(255) null, "password" varchar(255) null, "otp" varchar(255) null, "reporting_to_id" varchar(255) null, "role" text check ("role" in ('employee', 'head', 'admin', 'it')) not null, "created_at" timestamptz not null, "updated_at" timestamptz null, constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "assignment" ("id" serial primary key, "user_id" varchar(255) not null, "type" text check ("type" in ('ap', 'cctv', 'dekstop', 'hardDisk', 'ipPhone', 'laptop', 'network', 'nvr', 'printer', 'projector', 'punchMachine', 'sim', 'switch')) not null, "asset_id" int not null, "created_at" timestamptz not null, "returned_on" timestamptz not null, "return_remark" text null);`);

    this.addSql(`alter table "user" add constraint "user_reporting_to_id_foreign" foreign key ("reporting_to_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "assignment" add constraint "assignment_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

}
