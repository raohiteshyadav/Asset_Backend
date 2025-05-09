import { Migration } from '@mikro-orm/migrations';

export class Migration20250424064101 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "assignment" drop constraint "assignment_user_id_foreign";`);

    this.addSql(`alter table "ap" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "ap" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "ap" alter column "location" drop not null;`);

    this.addSql(`alter table "assignment" add column "ap_sn" varchar(255) null, add column "cctv_sn" varchar(255) null, add column "desktop_sn" varchar(255) null, add column "hard_disk_sn" varchar(255) null, add column "ip_phone_sn" varchar(255) null, add column "laptop_sn" varchar(255) null, add column "network_device_sn" varchar(255) null, add column "nvr_sn" varchar(255) null, add column "other_sn" varchar(255) null, add column "printer_sn" varchar(255) null, add column "projector_sn" varchar(255) null, add column "punch_machine_sn" varchar(255) null, add column "switch_sn" varchar(255) null, add column "ap_returned_at" timestamptz null, add column "cctv_returned_at" timestamptz null, add column "desktop_returned_at" timestamptz null, add column "hard_disk_returned_at" timestamptz null, add column "ip_phone_returned_at" timestamptz null, add column "laptop_returned_at" timestamptz null, add column "network_device_returned_at" timestamptz null, add column "nvr_returned_at" timestamptz null, add column "other_returned_at" timestamptz null, add column "printer_returned_at" timestamptz null, add column "projector_returned_at" timestamptz null, add column "punch_machine_returned_at" timestamptz null, add column "switch_returned_at" timestamptz null, add column "exact_location" varchar(255) null, add column "remark" varchar(255) null;`);

    this.addSql(`alter table "cctv" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "cctv" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "cctv" alter column "location" drop not null;`);
    this.addSql(`alter table "cctv" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "cctv" alter column "status" set default 'active';`);

    this.addSql(`alter table "desktop" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "desktop" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "desktop" alter column "location" drop not null;`);
    this.addSql(`alter table "desktop" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "desktop" alter column "status" set default 'active';`);

    this.addSql(`alter table "hard_disk" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "hard_disk" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "hard_disk" alter column "location" drop not null;`);
    this.addSql(`alter table "hard_disk" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "hard_disk" alter column "status" set default 'active';`);

    this.addSql(`alter table "ip_phone" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "ip_phone" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "ip_phone" alter column "location" drop not null;`);
    this.addSql(`alter table "ip_phone" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "ip_phone" alter column "status" set default 'active';`);

    this.addSql(`alter table "laptop" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "laptop" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "laptop" alter column "location" drop not null;`);
    this.addSql(`alter table "laptop" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "laptop" alter column "status" set default 'active';`);

    this.addSql(`alter table "network_device" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "network_device" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "network_device" alter column "location" drop not null;`);
    this.addSql(`alter table "network_device" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "network_device" alter column "status" set default 'active';`);

    this.addSql(`alter table "nvr" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "nvr" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "nvr" alter column "location" drop not null;`);
    this.addSql(`alter table "nvr" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "nvr" alter column "status" set default 'active';`);

    this.addSql(`alter table "other" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "other" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "other" alter column "location" drop not null;`);
    this.addSql(`alter table "other" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "other" alter column "status" set default 'active';`);

    this.addSql(`alter table "printer" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "printer" alter column "location" drop not null;`);
    this.addSql(`alter table "printer" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "printer" alter column "status" set default 'active';`);
    this.addSql(`alter table "printer" alter column "category" type text using ("category"::text);`);
    this.addSql(`alter table "printer" alter column "category" set default 'own';`);

    this.addSql(`alter table "projector" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "projector" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "projector" alter column "location" drop not null;`);
    this.addSql(`alter table "projector" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "projector" alter column "status" set default 'active';`);

    this.addSql(`alter table "punch_machine" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "punch_machine" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "punch_machine" alter column "location" drop not null;`);
    this.addSql(`alter table "punch_machine" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "punch_machine" alter column "status" set default 'active';`);

    this.addSql(`alter table "switch" add column "category" text check ("category" in ('own', 'rental')) not null default 'own';`);
    this.addSql(`alter table "switch" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "switch" alter column "location" drop not null;`);
    this.addSql(`alter table "switch" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "switch" alter column "status" set default 'active';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "ap" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "ap" alter column "location" set not null;`);

    this.addSql(`alter table "cctv" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "cctv" alter column "location" set not null;`);
    this.addSql(`alter table "cctv" alter column "status" drop default;`);
    this.addSql(`alter table "cctv" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "desktop" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "desktop" alter column "location" set not null;`);
    this.addSql(`alter table "desktop" alter column "status" drop default;`);
    this.addSql(`alter table "desktop" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "hard_disk" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "hard_disk" alter column "location" set not null;`);
    this.addSql(`alter table "hard_disk" alter column "status" drop default;`);
    this.addSql(`alter table "hard_disk" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "ip_phone" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "ip_phone" alter column "location" set not null;`);
    this.addSql(`alter table "ip_phone" alter column "status" drop default;`);
    this.addSql(`alter table "ip_phone" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "laptop" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "laptop" alter column "location" set not null;`);
    this.addSql(`alter table "laptop" alter column "status" drop default;`);
    this.addSql(`alter table "laptop" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "network_device" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "network_device" alter column "location" set not null;`);
    this.addSql(`alter table "network_device" alter column "status" drop default;`);
    this.addSql(`alter table "network_device" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "nvr" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "nvr" alter column "location" set not null;`);
    this.addSql(`alter table "nvr" alter column "status" drop default;`);
    this.addSql(`alter table "nvr" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "other" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "other" alter column "location" set not null;`);
    this.addSql(`alter table "other" alter column "status" drop default;`);
    this.addSql(`alter table "other" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "printer" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "printer" alter column "location" set not null;`);
    this.addSql(`alter table "printer" alter column "status" drop default;`);
    this.addSql(`alter table "printer" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "printer" alter column "category" drop default;`);
    this.addSql(`alter table "printer" alter column "category" type text using ("category"::text);`);

    this.addSql(`alter table "projector" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "projector" alter column "location" set not null;`);
    this.addSql(`alter table "projector" alter column "status" drop default;`);
    this.addSql(`alter table "projector" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "punch_machine" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "punch_machine" alter column "location" set not null;`);
    this.addSql(`alter table "punch_machine" alter column "status" drop default;`);
    this.addSql(`alter table "punch_machine" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "switch" alter column "location" type text using ("location"::text);`);
    this.addSql(`alter table "switch" alter column "location" set not null;`);
    this.addSql(`alter table "switch" alter column "status" drop default;`);
    this.addSql(`alter table "switch" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "assignment" add column "user_id" varchar(255) not null, add column "type" text check ("type" in ('ap', 'cctv', 'dekstop', 'hardDisk', 'ipPhone', 'laptop', 'network', 'nvr', 'printer', 'projector', 'punchMachine', 'sim', 'switch')) not null, add column "asset_id" int not null, add column "returned_on" timestamptz not null, add column "return_remark" text null;`);
    this.addSql(`alter table "assignment" add constraint "assignment_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

}
