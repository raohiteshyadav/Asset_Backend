import { Migration } from '@mikro-orm/migrations';

export class Migration20250421070447 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "printer" add column "category" text check ("category" in ('own', 'rental')) not null;`);

    this.addSql(`alter table "assignment" add column "emp_id" varchar(255) not null;`);
  }

}
