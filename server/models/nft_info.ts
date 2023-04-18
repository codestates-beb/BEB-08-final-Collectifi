import {Model, DataTypes, Sequelize} from 'sequelize';

interface Nft_infoAttributes {
  id: number;
  player: string;
  season: string;
  team: string;
  card_pack: number;
  card_color: number;
  img_url: string;
  team_record: string;
  man_record: string;
}

class Nft_info extends Model<Nft_infoAttributes> {
  public id!: number;
  public player!: string;
  public season!: string;
  public team!: string;
  public card_pack!: number;
  public card_color!: number;
  public img_url!: string;
  public team_record!: string;
  public man_record!: string;

  public static initModel(sequelize: Sequelize) {
    return Nft_info.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        card_pack: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        card_color: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        img_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        team_record: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        man_record: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Nft_info',
        tableName: 'nft_infos',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
}

export default Nft_info;
