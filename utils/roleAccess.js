const tokenService = require("./token.service");

module.exports = function (roles) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Unauthorized user" });
      }
      const { roles: userRoles } = tokenService.validateAccessToken(token);
      let hasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "You have no access" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "Unauthorized user" });
    }
  };
};
