const Sequelize = require("sequelize");
const db = require("../db/db");
const User = require("../models/user.model");

const Sociality = db.define("sociality", {
  sociality: {
    type: Sequelize.INTEGER,
  },
});

User.hasOne(Sociality, { sourceKey: "id", foreignKey: "id" });

module.exports = Sociality;
