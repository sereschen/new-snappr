import express from 'express';
import cors from 'cors';
import http from 'http';
import { User } from './entities/User';
import { EntityManager, EntityRepository, MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import UserController from './controllers/UserController';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

import 'express-async-errors';  

export const context  = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  users: EntityRepository<User>,
};

export const app = express();
const port = Number(process.env.PORT) || 3000;

export const init = (async () => {
  context.orm = await MikroORM.init({
    entities: [User],
    entitiesTs: [User],
    dbName: 'snappr-db',
    driver: PostgreSqlDriver,
    allowGlobalContext: true,
    extensions: [Migrator],
  });
  context.em = context.orm.em;
  context.users = context.orm.em.getRepository(User);

  app.use(express.json());
  app.use(cors());

  app.use(errorHandlerMiddleware);

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Snappr API' })
  });

  app.use('/user', UserController);
  
  context.server = app.listen(port, () => {
    console.log(`Express server started at http://localhost:${port}`);
  });
})();