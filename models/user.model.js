const Sequelize = require("sequelize");
const db = require("../db/db");
const Role = require("./role.model");

const User = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roles: {
    type: Sequelize.ARRAY({
      type: Sequelize.STRING,
      references: {
        model: Role,
        key: "role",
      },
    }),
  },
});

module.exports = User;
