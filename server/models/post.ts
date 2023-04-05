import { Model, DataTypes, Sequelize } from 'sequelize';

interface PostAttributes {
    user_id:number;
    title:string;
    content:string;
    likes:number;
    dislikes:number;
    created_at: string;
}

class Post extends Model<PostAttributes> {
    public user_id!: number;
    public title!: string;
    public content!: string;
    public likes!: number;
    public dislikes!: number;
    public created_at!: string;

    public static initModel(sequelize: Sequelize) {
        return Post.init(
        {
            user_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dislikes: {
                type: DataTypes.INTEGER,
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
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
        );
    }

      public static associate(db: any) {
        db.Post.belongsTo(db.User, {
          foreignKey: 'user_id',
          targetKey: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      }
}

export default Post;