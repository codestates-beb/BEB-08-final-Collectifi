import { Model, DataTypes, Sequelize } from 'sequelize';

interface Post_commentAttributes {
    user_id:number;
    post_id:number;
    content:string;
    created_at: string;
}

class Post_comment extends Model<Post_commentAttributes> {
    public user_id!: number;
    public post_id!: number;
    public content!: string;
    public created_at!: string;

    public static initModel(sequelize: Sequelize) {
        return Post_comment.init(
        {
            user_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Post_comment',
            tableName: 'post_comments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
        );
    }

      public static associate(db: any) {
        db.Post_comment.belongsTo(db.Post, {
          foreignKey: 'post_id',
          targetKey: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
        db.Post_comment.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
          });
      }
}

export default Post_comment;