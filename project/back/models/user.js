const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: "email",
        },
        username: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: "username",
        },
        realname: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        about: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        website: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.belongsTo(db.Userboard);
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, { through: "Prod", as: "Prodded" });
  }
};

// id: 101,
// email: "yjg@bloobolt.com",
// username: "yjg",
// realname: "realyjg",
// status: true, // add
// about: "안녕하세요", // add string (30제한)
// avatar: "", // add string src
// role: "Web Developer", // add string(18)
// country: "Korea",
// website: "demo.com",

// 유저보드
// rank: 5, // 1 ~ 5, 기본 0, 어드민 9
// rankPoint: 0,
// reported: 0, // 10 -> blind
