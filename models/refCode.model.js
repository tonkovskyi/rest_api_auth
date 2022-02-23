const Sequelize = require("sequelize");
const db = require("../db/db");
const User = require("../models/user.model");

const RefCode = db.define("refcodes", {
  refcode: {
    type: Sequelize.STRING,
    unique: true,
  },
});

User.hasOne(RefCode, { sourceKey: "id", foreignKey: "id" });

module.exports = RefCode;
