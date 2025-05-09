import { Migration } from '@mikro-orm/migrations';

export class Migration20250417114844 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "ap" alter column "status" type text using ("status"::text);`);
    this.addSql(`alter table "ap" alter column "status" set default 'active';`);

    this.addSql(`alter table "dekstop" alter column "ram" type int using ("ram"::int);`);

    this.addSql(`alter table "laptop" alter column "ram" type int using ("ram"::int);`);
    this.addSql(`alter table "laptop" rename column "desciption" to "description";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "ap" alter column "status" drop default;`);
    this.addSql(`alter table "ap" alter column "status" type text using ("status"::text);`);

    this.addSql(`alter table "dekstop" alter column "ram" type varchar(255) using ("ram"::varchar(255));`);

    this.addSql(`alter table "laptop" alter column "ram" type varchar(255) using ("ram"::varchar(255));`);
    this.addSql(`alter table "laptop" rename column "description" to "desciption";`);
  }

}
