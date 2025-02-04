import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {

  @PrimaryKey({ type: 'bigint' })
  id!: bigint;

  @Property()
  email!: string;

  @Property()
  password!: string;

}