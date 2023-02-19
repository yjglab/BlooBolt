const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class PostImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        src: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
      },
      {
        modelName: "PostImage",
        tableName: "postimages",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.PostImage.belongsTo(db.Post);
  }
};
