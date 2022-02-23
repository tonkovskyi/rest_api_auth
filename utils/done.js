const Todo = require("../models/todo.model");

module.exports = isDone = async (req, res, next) => {
  try {
    const check = await Todo.findOne({
      where: {
        todoId: req.params.id,
        check: false,
      },
    });
    if (check) {
      return res.status(400).send({ message: "Not all subtodos are closed" });
    } else {
      return next();
    }
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};