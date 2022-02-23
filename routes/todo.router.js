const Router = require("express");
const router = new Router();
const TodoController = require("../controllers/todo.controller");
const isDone = require("../utils/done");

router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getOne);
router.post("/", TodoController.createOne);
router.put("/:id", TodoController.updateOne);
router.put("/done/:id", isDone, TodoController.isDone);
router.delete("/:id", TodoController.deleteOne);

module.exports = router;