const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ where: { email: email } });
    if (candidate) {
      throw new Error(`User with email address ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const userRole = await Role.findOne({ where: { role: "USER" } });
    const user = await User.create({
      email,
      password: hashPassword,
      roles: [userRole.role],
    });

    const payload = { id: user.id, email: user.email, roles: [userRole.role] };
    const tokens = tokenService.generateTokens(payload);
    await tokenService.saveToken(payload.id, tokens.refreshToken);

    return { ...tokens, user: payload };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error(`User with email address ${email} not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error("Invalid password");
    }
    const payload = { id: user.id, email: user.email, roles: user.roles };
    const tokens = tokenService.generateTokens(payload);

    await tokenService.saveToken(payload.id, tokens.refreshToken);
    return { ...tokens, user: payload };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Unauthorized user");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(userData.id, refreshToken);
    if (!userData || !tokenFromDb) {
      throw new Error("Unauthorized user");
    }
    const user = await User.findByPk(userData.id);
    const payload = { id: user.id, email: user.email, roles: user.roles };
    const tokens = tokenService.generateTokens(payload);

    await tokenService.saveToken(payload.id, tokens.refreshToken);
    return { ...tokens, user: payload };
  }

  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
  async updateOne(id, roles, isRole) {
    const userRole = await Role.findOne({ where: { role: isRole } });
    if (!userRole) {
      throw new Error(`Role not found`);
    }
    const user = await User.update(roles, {
      where: { id: id },
    });
    return user;
  }
}

module.exports = new UserService();