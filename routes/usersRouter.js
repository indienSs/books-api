import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import {
  errorsValidation,
  idParamValidation,
  loginValidation,
  registerValidation,
  roleValidation,
  tokenValidation,
} from "../middlewares/validations.js";

export const usersRouter = new Router();

usersRouter.post("/users/register", loginValidation, registerValidation, errorsValidation, usersController.register);
usersRouter.post("/users/login", loginValidation, errorsValidation, usersController.login);
usersRouter.get("/users/me", jwtMiddleware.validate, usersController.getMe);
usersRouter.post(
  "/users/register/validate/:token",
  tokenValidation,
  errorsValidation,
  usersController.validateRegisterToken
);
usersRouter.put(
  "/users/:id/role",
  jwtMiddleware.validateAdmin,
  idParamValidation,
  roleValidation,
  errorsValidation,
  usersController.updateRole
);
