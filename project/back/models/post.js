const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        unique: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        topic: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        class: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        edited: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        blinded: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        reverted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        question: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.PostImage);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "PostProd", as: "PostProdders" });
    db.Post.belongsToMany(db.User, { through: "PostMark", as: "PostMarkers" });
    db.Post.hasMany(db.Comment);
  }
};
