import { Migration } from '@mikro-orm/migrations';

export class Migration20250425063045 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "assignment" add column "asset_type" text check ("asset_type" in ('AP', 'CCTV', 'DESKTOP', 'HARD_DISK', 'IP_PHONE', 'LAPTOP', 'NETWORK_DEVICE', 'NVR', 'OTHER', 'PRINTER', 'PROJECTOR', 'PUNCH_MACHINE', 'SWITCH')) not null, add column "sn_number" varchar(255) not null, add column "returned_at" timestamptz null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "assignment" add column "ap_sn" varchar(255) null, add column "cctv_sn" varchar(255) null, add column "desktop_sn" varchar(255) null, add column "hard_disk_sn" varchar(255) null, add column "ip_phone_sn" varchar(255) null, add column "laptop_sn" varchar(255) null, add column "network_device_sn" varchar(255) null, add column "nvr_sn" varchar(255) null, add column "other_sn" varchar(255) null, add column "printer_sn" varchar(255) null, add column "projector_sn" varchar(255) null, add column "punch_machine_sn" varchar(255) null, add column "switch_sn" varchar(255) null, add column "cctv_returned_at" timestamptz null, add column "desktop_returned_at" timestamptz null, add column "hard_disk_returned_at" timestamptz null, add column "ip_phone_returned_at" timestamptz null, add column "laptop_returned_at" timestamptz null, add column "network_device_returned_at" timestamptz null, add column "nvr_returned_at" timestamptz null, add column "other_returned_at" timestamptz null, add column "printer_returned_at" timestamptz null, add column "projector_returned_at" timestamptz null, add column "punch_machine_returned_at" timestamptz null, add column "switch_returned_at" timestamptz null;`);
    this.addSql(`alter table "assignment" rename column "returned_at" to "ap_returned_at";`);
  }

}
