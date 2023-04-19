import {Model, DataTypes, Sequelize} from 'sequelize';

interface RankAttributes {
  user_id: number;
  post_id: number;
  likes: number;
  ranking: number;
}

class Rank extends Model<RankAttributes> {
  public user_id!: number;
  public post_id!: number;
  public likes!: number;
  public ranking!: number;

  public static initModel(sequelize: Sequelize) {
    return Rank.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ranking: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Rank',
        tableName: 'ranks',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  public static associate(db: any) {
    db.Rank.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Rank.belongsTo(db.Post, {
      foreignKey: 'post_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export default Rank;
