import { Migration } from '@mikro-orm/migrations';

export class Migration20250418232326 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "ap" add constraint "ap_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "cctv" add constraint "cctv_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "desktop" add constraint "desktop_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "hard_disk" add constraint "hard_disk_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "ip_phone" add constraint "ip_phone_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "network_device" add constraint "network_device_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "nvr" add constraint "nvr_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "other" add constraint "other_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "printer" add constraint "printer_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "projector" add constraint "projector_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "punch_machine" add constraint "punch_machine_sn_number_unique" unique ("sn_number");`);

    this.addSql(`alter table "switch" add constraint "switch_sn_number_unique" unique ("sn_number");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "ap" drop constraint "ap_sn_number_unique";`);

    this.addSql(`alter table "cctv" drop constraint "cctv_sn_number_unique";`);

    this.addSql(`alter table "desktop" drop constraint "desktop_sn_number_unique";`);

    this.addSql(`alter table "hard_disk" drop constraint "hard_disk_sn_number_unique";`);

    this.addSql(`alter table "ip_phone" drop constraint "ip_phone_sn_number_unique";`);

    this.addSql(`alter table "network_device" drop constraint "network_device_sn_number_unique";`);

    this.addSql(`alter table "nvr" drop constraint "nvr_sn_number_unique";`);

    this.addSql(`alter table "other" drop constraint "other_sn_number_unique";`);

    this.addSql(`alter table "printer" drop constraint "printer_sn_number_unique";`);

    this.addSql(`alter table "projector" drop constraint "projector_sn_number_unique";`);

    this.addSql(`alter table "punch_machine" drop constraint "punch_machine_sn_number_unique";`);

    this.addSql(`alter table "switch" drop constraint "switch_sn_number_unique";`);
  }

}
