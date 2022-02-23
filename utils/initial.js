const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");

const initial = async () => {
  const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 3);
  User.create({
    id: 0,
    email: process.env.ADMIN_EMAIL,
    password: hashPassword,
    roles: ["ADMIN"],
  });
  Role.create({
    id: 1,
    role: "ADMIN",
  });
  Role.create({
    id: 2,
    role: "USER",
  });
};

module.exports = initial;
