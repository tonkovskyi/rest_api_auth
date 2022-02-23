require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const cookieParser = require("cookie-parser");
const todoRouter = require("./routes/todo.router");
const userRouter = require("./routes/user.router");
const refferalRouter = require("./routes/refferal.router");
const followRouter = require("./routes/follow.router");
const initial = require("./utils/initial");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRouter);
app.use("/users", userRouter);
app.use("/refferal", refferalRouter);
app.use("/followers", followRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: false }).then(() => {
      initial();
    });
    console.log("app ready");
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
})();