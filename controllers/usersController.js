import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import createHttpError from "http-errors";
import _ from "lodash";
import { decodeRegistrationToken, encodeRegistrationToken } from "../utils/jwtCoders.js";

class UsersController {
  async register(req, res) {
    try {
      const { username, password, email } = req.body;
      const salt = await bcrypt.genSalt(5);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await db.users.create({ data: { user_name: username, password_hash: passwordHash, email } });
      if (!newUser) throw createHttpError.Forbidden();
      res.status(200).json(_.omit(newUser, ["password_hash"]));
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await db.users.findUnique({ where: { user_name: username } });
      if (!user) throw createHttpError.NotFound("User not found");
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) throw createHttpError.Forbidden("Incorrect password");
      const token = encodeRegistrationToken(user);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }
  async getMe(req, res) {
    const { id } = req.user;
    const user = await db.users.findUnique({ where: { id: Number(id) } });
    if (!user) throw createHttpError.NotFound("User not found");
    res.status(200).json(user);
  }
  async updateRole(req, res) {
    try {
      const user = await db.users.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          role: Number(req.body.role),
        },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
  async validateRegisterToken(req, res) {}
}

export const usersController = new UsersController();
