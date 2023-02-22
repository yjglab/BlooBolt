const Sequelize = require("sequelize");
const user = require("./user");
const userreport = require("./userreport");
const post = require("./post");
const postImage = require("./postimage");
const hashtag = require("./hashtag");
const comment = require("./comment");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = user;
db.UserReport = userreport;
db.Post = post;
db.PostImage = postImage;
db.Hashtag = hashtag;
db.Comment = comment;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
