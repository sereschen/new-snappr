import { Migration } from '@mikro-orm/migrations';

export class Migration20250204203503 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" bigserial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
