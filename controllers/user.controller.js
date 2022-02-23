const userService = require("../utils/user.service");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async updateRole(req, res, next) {
    try {
      const id = req.params.id;
      const isRole = req.body.roles;
      const roles = { roles: [isRole] };
      const userData = await userService.updateOne(id, roles, isRole);
      return res.status(200).json(userData);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
}

module.exports = new UserController();