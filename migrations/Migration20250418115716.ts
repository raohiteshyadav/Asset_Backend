import { Migration } from '@mikro-orm/migrations';

export class Migration20250418115716 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "laptop" add constraint "laptop_sn_number_unique" unique ("sn_number");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "laptop" drop constraint "laptop_sn_number_unique";`);
  }

}
