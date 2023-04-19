import {Model, DataTypes, Sequelize} from 'sequelize';

interface BlacklistAttributes {
  address: string;
  created_at: Date;
}

class Blacklist extends Model<BlacklistAttributes> {
  public address!: string;
  public created_at!: Date;

  public static initModel(sequelize: Sequelize) {
    return Blacklist.init(
      {
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
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
        modelName: 'Blacklist',
        tableName: 'blacklists',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
}

export default Blacklist;
