const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database 연결");
  })
  .catch(console.error);

if (process.env.NODE_ENV === "production") {
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/user", userRouter);

app.listen(4080, () => {
  console.log("🌐 Server 연결");
});
