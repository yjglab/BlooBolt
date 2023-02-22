const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserReport extends Model {
  static init(sequelize) {
    return super.init(
      {
        targetPostId: {
          type: DataTypes.TINYINT,
          allowNull: true,
        },
        reporterId: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        reporterEmail: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        reporterUsername: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "UserReport",
        tableName: "userreports",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserReport.belongsTo(db.User);
  }
};
