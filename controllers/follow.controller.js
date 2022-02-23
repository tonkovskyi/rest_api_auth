const FollowService = require("../utils/follow.service");

class FollowController {
  async follow(req, res, next) {
    try {
      const id = req.params.id;
      const token = req.headers.authorization.split(" ")[1];
      const newFollow = await FollowService.followUser(token, id);
      return res.status(200).json(newFollow);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
  async unfollow(req, res, next) {
    try {
      const id = req.params.id;
      const token = req.headers.authorization.split(" ")[1];
      const deleteFollow = await FollowService.unfollowUser(token, id);
      return res.status(200).json(deleteFollow);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
  async followed(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const following = await FollowService.followedUsers(token);
      return res.status(200).json(following);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }
}

module.exports = new FollowController();