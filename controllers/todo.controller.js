const TodoService = require("../utils/todo.service");

class TodoController {
  async getAll(req, res) {
    try {
      const todos = await TodoService.getAllTodos();
      return res.status(200).json(todos);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const id = req.params.id;
      const todo = await TodoService.getOneTodos(id);
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async createOne(req, res) {
    try {
      const todo = await TodoService.createOneTodo(req, res);
      console.log("Todo crerated");
      return res.status(201).json(todo);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }

  async updateOne(req, res) {
    try {
      const todo = await TodoService.updateOneTodo(req, res);
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }

  async isDone(req, res) {
    try {
      const id = req.params.id;
      const data = { check: req.body.check };
      const todo = await TodoService.allClosed(data, id);
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }

  async deleteOne(req, res) {
    try {
      const id = req.params.id;
      const todo = await TodoService.deleteOneTodo(id);
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }
}

module.exports = new TodoController();
