import express from 'express';
import cors from 'cors';
import http from 'http';
import { asyncMiddleware } from './middlewares/asyncMiddleware';
import { mikroOrmMiddleware } from './middlewares/mikroOrmMiddleware';
import { User } from './entities/User';
import { EntityManager, EntityRepository, MikroORM, PostgreSqlDriver, RequestContext } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  users: EntityRepository<User>,
};

export const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  DI.orm = await MikroORM.init({
    entities: [User],
    entitiesTs: [User],
    dbName: 'snappr-db',
    driver: PostgreSqlDriver,
    allowGlobalContext: true,
    extensions: [Migrator],
  });
  DI.em = DI.orm.em;
  DI.users = DI.orm.em.getRepository(User);

  app.use(express.json());
  app.use(cors());
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Snappr API' })
  });
  app.get('/users', (req, res) => {
    res.json(DI.users.findAll());
  });
  
  app.post('/users/create', (req, res) => {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    DI.em.create(User, user);
    DI.em.flush();
    res.json(user);
  });

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();