const tokenService = require("./token.service");
const Follow = require("../models/follow.model");
const User = require("../models/user.model");
const Sociality = require("../models/sociality.model");

class FollowService {
  async followUser(token, id) {
    const user = tokenService.validateAccessToken(token);
    const alreadyFollow = await Follow.findOne({
      where: { userId: user.id, follower: id },
    });
    if (alreadyFollow) {
      throw new Error(`You are already following this user`);
    }
    const createdUser = await User.findOne({ where: { id: id } });
    if (!createdUser) {
      throw new Error(`You cannot follow this user`);
    }
    const userFollow = await Follow.create({
      userId: user.id,
      follower: id,
    }).then(async () => {
      const soc1 = await Sociality.findOne({ where: { id: user.id } });
      const soc2 = await Sociality.findOne({ where: { id: id } });
      if (!soc1 && !soc2) {
        await Sociality.create({ id: user.id, sociality: 1 });
        await Sociality.create({ id: id, sociality: 1 });
      }
      if (!soc1 && soc2) {
        await Sociality.create({ id: user.id, sociality: 1 });
        await Sociality.increment({ sociality: 1 }, { where: { id: id } });
      }
      if (soc1 && !soc2) {
        await Sociality.increment({ sociality: 1 }, { where: { id: user.id } });
        await Sociality.create({ id: id, sociality: 1 });
      }
      if (soc1 && soc2) {
        await Sociality.increment({ sociality: 1 }, { where: { id: user.id } });
        await Sociality.increment({ sociality: 1 }, { where: { id: id } });
      }
    });
    return userFollow;
  }
  async unfollowUser(token, id) {
    const user = tokenService.validateAccessToken(token);
    const alreadyFollow = await Follow.findOne({
      where: { userId: user.id, follower: id },
    });
    if (!alreadyFollow) {
      throw new Error(`You are not following this user`);
    }
    const userUnfollow = await Follow.destroy({
      where: { userId: user.id, follower: id },
    }).then(async () => {
      await Sociality.decrement({ sociality: 1 }, { where: { id: user.id } });
      await Sociality.decrement({ sociality: 1 }, { where: { id: id } });
    });
    return userUnfollow;
  }
  async followedUsers(token) {
    const user = tokenService.validateAccessToken(token);
    const allFollowing = await Follow.findAll({ where: { userId: user.id } });
    return allFollowing;
  }
}

module.exports = new FollowService();