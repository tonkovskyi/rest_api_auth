const tokenService = require("../utils/token.service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .status(403)
        .send({ message: "A token is required for authentication" });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).send({ message: "Invalid Token" });
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    req.user = userData;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Bad Request:" + err.message });
  }
};