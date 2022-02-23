const refferalService = require("../utils/refferal.service");

class RefferalController {
  async generate(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const generateInv = await refferalService.generateInvite(token);
      return res.status(200).json(generateInv);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
  async getTop(req, res, next) {
    try {
      const qCount = req.query.count;
      const users = await refferalService.getSelectedTop(qCount);
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
  async getPlace(req, res, next) {
    try {
      const qEmail = req.query.email;
      const top = await refferalService.placeInTop(qEmail);
      return res.status(200).json(`Place in top: ${top}`);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
}

module.exports = new RefferalController();
