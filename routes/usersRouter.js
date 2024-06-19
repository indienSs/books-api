import { Router } from "express";
import { usersController } from "../controllers/usersController.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import * as validator from "../middlewares/validations.js";

export const usersRouter = new Router();

usersRouter.post(
  "/users/register",
  validator.loginValidation,
  validator.registerValidation,
  validator.errorsValidation,
  usersController.register
);
usersRouter.post("/users/login", validator.loginValidation, validator.errorsValidation, usersController.login);
usersRouter.get("/users/me", jwtMiddleware.validate, usersController.getMe);
usersRouter.get(
  "/users/register/validate/:token",
  validator.tokenValidation,
  validator.errorsValidation,
  usersController.validateRegisterToken
);
usersRouter.put(
  "/users/:id/role",
  jwtMiddleware.validateAdmin,
  validator.idParamValidation,
  validator.roleValidation,
  validator.errorsValidation,
  usersController.updateRole
);
