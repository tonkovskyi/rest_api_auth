const Sequelize = require("sequelize");
const db = require("../db/db");
const User = require("./user.model");

const Todo = db.define("todos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  check: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  todoId: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
});

User.hasMany(Todo, {
  foreignKey: "userId",
  targetKey: "id",
});

Todo.hasMany(Todo, {
  foreignKey: "todoId",
  targetKey: "id",
});

module.exports = Todo;