import {Model, DataTypes, Sequelize} from 'sequelize';

interface NftAttributes {
  token_id: number;
  user_id: number;
  player: string;
  season: string;
  team: string;
  card_color: number;
  price: number;
  selling_price: number;
  img_url: string;
  isSell: boolean;
}

class Nft extends Model<NftAttributes> {
  public token_id!: number;
  public user_id!: number;
  public player!: string;
  public season!: string;
  public team!: string;
  public card_color!: number;
  public price!: number;
  public selling_price!: number;
  public img_url!: string;
  public isSell!: boolean;

  public static initModel(sequelize: Sequelize) {
    return Nft.init(
      {
        token_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        player: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        season: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        team: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        card_color: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        selling_price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        img_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        isSell: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Nft',
        tableName: 'nfts',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  public static associate(db: any) {
    db.Nft.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    db.Nft.hasMany(db.Post, {
      foreignKey: 'nft_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export default Nft;
