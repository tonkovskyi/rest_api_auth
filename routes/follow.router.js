const Router = require("express");
const router = new Router();
const FollowController = require("../controllers/follow.controller");
const isAuthenticated = require("../utils/auth");

router.post("/follow/:id", isAuthenticated, FollowController.follow);
router.delete("/unfollow/:id", isAuthenticated, FollowController.unfollow);
router.get("/followed", isAuthenticated, FollowController.followed);

module.exports = router;