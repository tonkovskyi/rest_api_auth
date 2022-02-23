const Sequelize = require("sequelize");
const db = require("../db/db");
const User = require("../models/user.model");

const Follow = db.define("followers", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  follower: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Follow, { sourceKey: "id", foreignKey: "userId" });
User.hasMany(Follow, { sourceKey: "id", foreignKey: "follower" });

module.exports = Follow;