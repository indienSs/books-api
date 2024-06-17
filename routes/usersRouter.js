import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";

export const usersRouter = new Router();

usersRouter.post("/users/register", usersController.register);
usersRouter.post("/users/login", usersController.login);
usersRouter.get("/users/me", jwtMiddleware.validate, usersController.getMe);
usersRouter.put("/users/:id/role", jwtMiddleware.validateAdmin, usersController.updateRole);
