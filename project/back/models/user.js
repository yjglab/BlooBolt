const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        usercode: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: "email",
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: "username",
        },
        realname: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: "",
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        class: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        about: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "",
        },
        role: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "None",
        },
        avatar: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        rank: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 0,
        },
        rankPoint: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        country: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: "None",
        },
        address: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: "",
        },
        website: {
          type: DataTypes.STRING(200),
          allowNull: false,
          defaultValue: "None",
        },
        reported: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 0,
        },
        banned: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        social: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        socialId: {
          type: DataTypes.STRING(100),
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
    db.User.hasMany(db.Post);
    db.User.hasMany(db.UserReport);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "PostProd", as: "PostProdded" });
    db.User.belongsToMany(db.Post, { through: "PostMark", as: "PostMarked" });
    db.User.belongsToMany(db.Comment, {
      through: "CommentProd",
      as: "CommentProdded",
    });
    db.User.belongsToMany(db.User, {
      through: "Trace",
      as: "Tracers",
      foreignKey: "TracingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Trace",
      as: "Tracings",
      foreignKey: "TracerId",
    });
  }
};
