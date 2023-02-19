const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "bloobolt",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    // logging: false,
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "bloobolt",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    // logging: false,
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "bloobolt",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    logging: false,
  },
};
