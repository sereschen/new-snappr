import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity {

  @PrimaryKey()
  id!: number;

  @Property()
  email?: string;

  @Property()
  password?: string;

}