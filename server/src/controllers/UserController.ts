import { Router, RequestHandler } from "express";
import { context } from "../index";
import { User } from "../entities/User";
import { HTTPError } from "../utils/errors";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";

const router = Router();

const getAllUsers: RequestHandler = async (req, res) => {
  res.json(await context.users.findAll());
}

const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body; 
  if (!email || !password) {
    throw new HTTPError(400, 'Email and password are required', null, 'UserController');
  }
  const user = new User();
  user.email = email;
  user.password = password;
  await context.em.create(User, user);
  await context.em.flush();
  res.json(user);
}



router.post('/create', asyncMiddleware(createUser));
router.get('/all', asyncMiddleware(getAllUsers));



export default router;