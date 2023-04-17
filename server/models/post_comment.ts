import { Model, DataTypes, Sequelize, DATE, NOW } from "sequelize";

interface Post_commentAttributes {
  user_id: number;
  post_id: number;
  content: string;
  likes: number;
  dislikes: number;
  created_at: Date;
}

class Post_comment extends Model<Post_commentAttributes> {
  public user_id!: number;
  public post_id!: number;
  public content!: string;
  public likes!: number;
  public dislikes!: number;
  public created_at!: Date;

  public static initModel(sequelize: Sequelize) {
    return Post_comment.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        dislikes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Post_comment",
        tableName: "post_comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  public static associate(db: any) {
    db.Post_comment.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.Post_comment.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.Post_comment.hasMany(db.Post_comment_liked, {
      foreignKey: "post_comment_id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export default Post_comment;
