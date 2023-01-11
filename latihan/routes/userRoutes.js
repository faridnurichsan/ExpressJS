import { Router } from "express";
import userController from '../Controller/userController'

const routes = new Router();
routes.get('/user',userController.GetAll);
routes.put('/user/:id', userController.UpdateUser);

export default routes;
