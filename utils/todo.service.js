const Todo = require("../models/todo.model");
const TODO_MODEL = require("../data/todo.data");

class TodoService {
  async getAllTodos() {
    const getTodos = await Todo.findAll();
    return getTodos;
  }
  async getOneTodos(id) {
    const todo = await Todo.findByPk(id);
    return todo;
  }
  async createOneTodo(req, res) {
    const alrCreated = await Todo.max("id");
    if (alrCreated) {
      if (alrCreated + 1 === req.body.todoId) {
        throw new Error("Todo cannot be subtodo of itself");
      }
    }
    const todo = await Todo.create(TODO_MODEL(req));
    return todo;
  }
  async updateOneTodo(req, res) {
    const todo = await Todo.update(TODO_MODEL(req), {
      where: { id: req.params.id },
    });
    return todo;
  }
  async allClosed(data, id) {
    const todo = await Todo.update(data, {
      where: { id: id },
    });
    return todo;
  }
  async deleteOneTodo(id) {
    const todo = await Todo.destroy({ where: { id: id } });
    return todo;
  }
}

module.exports = new TodoService();