const User = require("../models/user.model");
const RefCode = require("../models/refCode.model");
const Sociality = require("../models/sociality.model");
const tokenService = require("./token.service");
const inviteCode = require("../utils/randomFunction");
const { Op } = require("sequelize");

class RefferalService {
  async generateInvite(token) {
    const user = tokenService.validateAccessToken(token);
    const hasAlready = await RefCode.findOne({ where: { id: user.id } });
    if (hasAlready) {
      throw new Error(`Referral code already exists`);
    }
    const refCode = await RefCode.create({
      id: user.id,
      refcode: inviteCode(6),
    });
    return refCode;
  }
  async getSelectedTop(qCount) {
    const users = await Sociality.findAll({
      limit: qCount,
      order: [["sociality", "DESC"]],
    });
    return users;
  }
  async placeInTop(qEmail) {
    const user = await User.findOne({ where: { email: qEmail } });
    const value = await Sociality.findByPk(user.id);
    const socUser = await Sociality.count({
      where: { sociality: { [Op.gt]: value.sociality } },
    });
    const finalTop = socUser + 1;
    return finalTop;
  }
}
module.exports = new RefferalService();