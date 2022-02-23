const Sequelize = require("sequelize");
const db = require("../db/db");

const Role = db.define("roles", {
  role: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: "User"
  },
});

module.exports = Role;
