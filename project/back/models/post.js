const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        topic: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
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
  }
};
/*
    id: 33,
    content: text, // 제힌 800
    topic: "JavaScript", // 제한 10
    createdAt: "1999.99.99",
    UserId: 101,
    User: {
      id: user.id,
      username: user.username,
      status: user.status,
      role: user.role,
      rank: user.rank,
    },
    Images: [
      {
        id: shortid.generate(),
        src: "https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg",
        PostId: 33,
      },
    ],
    Comments: [],
    Grokkers: [{ id: 101 }, { id: 102 }],
  };
*/
