import { Model, DataTypes, Sequelize, DATE, NOW } from "sequelize";

interface Post_likedAttributes {
  post_id: number;
  address: string;
  user_id: number;
}

class Post_liked extends Model<Post_likedAttributes> {
  public post_id!: number;
  public address!: string;
  public user_id!: number;

  public static initModel(sequelize: Sequelize) {
    return Post_liked.init(
      {

        post_id: {
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
        modelName: "Post_liked",
        tableName: "post_likeds",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  public static associate(db: any) {
    db.Post_liked.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export default Post_liked;
