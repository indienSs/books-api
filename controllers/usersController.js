class UsersController {
  async register(req, res) {
    const { username, password, email } = req.body;
  }
  async login(req, res) {
    const { username, password } = req.body;
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
