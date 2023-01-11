import { Router } from "express";
import UserController from '../controller/UserController';
import login from '../Auth/Login';

const routes = new Router();
// Get
routes.get('/users',UserController.getUser);
routes.get('/getLogin', login.checkToken,UserController.getUser);

// Create
routes.post('/createUser',UserController.CreateUser);
routes.post('/login',login.login)



export default routes;