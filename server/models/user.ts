import {Model, DataTypes, Sequelize} from 'sequelize';

interface UserAttributes {
  nickname: string;
  address: string;
  token_amount: number;
  referral: string;
  rank: number;
}

class User extends Model<UserAttributes> {
  public nickname!: string;
  public address!: string;
  public token_amount!: number;
  public referral!: string;
  public rank!: number;

  public static initModel(sequelize: Sequelize) {
    return User.init(
      {
        nickname: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        token_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        referral: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        rank: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  public static associate(db: any) {
    db.User.hasMany(db.Nft, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    db.User.hasMany(db.Post, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    db.User.hasMany(db.Post_comment, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export default User;
