class UsersController {
  async register(req, res) {
    const { username, password, email } = req.body;
  }
  async login(req, res) {}
  async getMe(req, res) {}
  async updateRole(req, res) {}
  async validateRegisterToken(req, res) {}
}

export const usersController = new UsersController();
