const Router = require("express");
const router = new Router();
const UserController = require("../controllers/user.controller");
const roleAccess = require("../utils/roleAccess");
const refferal = require("../utils/refferal");
const { body, validationResult } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      return next();
    }
  },
  refferal,
  UserController.registration
);
router.post("/login", UserController.login);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);
router.put("/:id", roleAccess(["ADMIN"]), UserController.updateRole);

module.exports = router;
