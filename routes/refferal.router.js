const Router = require("express");
const router = new Router();
const RefferalController = require("../controllers/refferal.controller");
const isAuthenticated = require("../utils/auth");

router.post("/generateref", isAuthenticated, RefferalController.generate);
router.get("/top", RefferalController.getTop);
router.get("/place", RefferalController.getPlace);

module.exports = router;
