const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();

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

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);

app.use("/user", userRouter);
app.listen(4080, () => {
  console.log("🌐 Server 실행");
});
