import { Router } from "express";
import { usersController } from "../controllers/usersController.js";

export const usersRouter = new Router();

usersRouter.post("/users/register", usersController.register);
usersRouter.get("/users/login", usersController.login);
usersRouter.get("/users/me", usersController.getUser);
usersRouter.put("/users/:id/role", usersController.updateRole);
