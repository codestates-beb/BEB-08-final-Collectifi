import { Model, DataTypes, Sequelize, DATE, NOW } from "sequelize";

interface Post_comment_likedAttributes {
  post_comment_id: number;
  address: string;
  user_id: number;
 
}

class Post_comment_liked extends Model<Post_comment_likedAttributes> {
  public pos_comment_id!: number;
  public address!: string;
  public user_id!: number;

  public static initModel(sequelize: Sequelize) {
    return Post_comment_liked.init(
      {

        post_comment_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
        
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Post_comment_liked",
        tableName: "post_comment_likeds",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  public static associate(db: any) {
    db.Post_comment_liked.belongsTo(db.Post_comment, {
      foreignKey: "post_comment_id",
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export default Post_comment_liked;
