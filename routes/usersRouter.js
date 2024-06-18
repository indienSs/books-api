import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import {
  errorsValidation,
  idParamValidation,
  loginValidation,
  registerValidation,
  roleValidation,
} from "../middlewares/validations.js";

export const usersRouter = new Router();

usersRouter.post("/users/register", loginValidation, registerValidation, errorsValidation, usersController.register);
usersRouter.get("/users/register/validate", usersController.validateRegisterToken);
usersRouter.post("/users/login", loginValidation, errorsValidation, usersController.login);
usersRouter.get("/users/me", jwtMiddleware.validate, usersController.getMe);
usersRouter.put(
  "/users/:id/role",
  jwtMiddleware.validateAdmin,
  idParamValidation,
  roleValidation,
  errorsValidation,
  usersController.updateRole
);
