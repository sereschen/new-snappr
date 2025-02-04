import { Request, Response, NextFunction } from 'express';
import { MikroORM, PostgreSqlDriver, RequestContext } from "@mikro-orm/postgresql";
import { asyncMiddleware } from "./asyncMiddleware";

export const mikroOrmMiddleware = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  const orm = await MikroORM.init({
    entities: ['./dist/entities/*.js'],
    entitiesTs: ['./src/entities/*.ts'],
    dbName: 'snappr-db',
    driver: PostgreSqlDriver,
  });   
  req.em = await orm.em.fork();
  RequestContext.create(orm.em, next);
  next();
})