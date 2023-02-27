const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");

const userRouter = require("./routes/user");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database 연결");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  // app.enable("trust proxy"); // https
  app.use(morgan("combined"));
  app.use(hpp()); // 보안용
  app.use(helmet()); // 보안용
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    // proxy: process.env.NODE_ENV === "production", // https
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" && ".bloobolt.com",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/users", usersRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/hashtag", hashtagRouter);

app.listen(4080, () => {
  console.log("🌐 Server 연결");
});
