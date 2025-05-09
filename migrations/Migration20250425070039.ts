import { Migration } from '@mikro-orm/migrations';

export class Migration20250425070039 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "assignment" ("id" serial primary key, "emp_id" varchar(255) not null, "asset_type" text check ("asset_type" in ('AP', 'CCTV', 'DESKTOP', 'HARD_DISK', 'IP_PHONE', 'LAPTOP', 'NETWORK_DEVICE', 'NVR', 'OTHER', 'PRINTER', 'PROJECTOR', 'PUNCH_MACHINE', 'SWITCH')) not null, "sn_number" varchar(255) not null, "exact_location" varchar(255) null, "created_at" timestamptz not null, "returned_at" timestamptz null, "remark" varchar(255) null);`);
  }

}
