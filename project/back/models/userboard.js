const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Userboard extends Model {
  static init(sequelize) {
    return super.init(
      {
        rank: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        rankpoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        reported: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
      },
      {
        modelName: "Userboard",
        tableName: "userboards",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Userboard.belongsTo(db.User);
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
