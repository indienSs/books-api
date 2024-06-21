import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import createHttpError from "http-errors";
import { encodeRegistrationToken } from "../utils/jwtCoders.js";
import { sendVerificationEmail } from "../utils/mailer.js";
import { generateRandomString } from "../utils/randomStringGenerator.js";
import { addDays } from "date-fns";
import { checkAccess, checkAdmin } from "../utils/checkAccess.js";
import { ACCESS_GET_ME } from "../constants/userAccess.js";
import _ from "lodash";

class UsersController {
  async register(req, res) {
    try {
      const { username, password, email } = req.body;

      const salt = await bcrypt.genSalt(5);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await db.users.create({ data: { user_name: username, password_hash: passwordHash, email } });
      if (!newUser) throw createHttpError.Forbidden();
      else {
        const token = generateRandomString();
        await db.verification.create({ data: { user_id: newUser.id, token, expired_at: addDays(new Date(), 1) } });
        sendVerificationEmail(email, token);
      }

      res.status(200).json(newUser);
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
      if (!user.active) throw createHttpError.Unauthorized("Confirm you email");

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
    try {
      if (!checkAccess(req.user, ACCESS_GET_ME)) throw createHttpError.Forbidden("Access");

      const { id } = req.user;

      const user = await db.users.findUnique({ where: { id: Number(id) } });
      if (!user) throw createHttpError.NotFound("User not found");

      res.status(200).json(_.omit(user, "password_hash"));
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }

  async updateRole(req, res) {
    try {
      if (!checkAdmin(req.user)) throw createHttpError.Forbidden("Access denied");

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

  async validateRegisterToken(req, res) {
    try {
      const { token } = req.params;

      const nonActiveUser = await db.verification.findFirst({
        where: {
          token,
        },
      });

      if (!nonActiveUser) throw createHttpError.NotFound("User not found");
      else {
        await Promise.all([
          db.users.update({
            where: {
              id: nonActiveUser.user_id,
            },
            data: {
              active: true,
            },
          }),
          db.verification.delete({
            where: {
              user_id: nonActiveUser.user_id,
            },
          }),
        ]);
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(error.status || 400).json({ message: error.message });
    }
  }
}

export const usersController = new UsersController();
