import {Model, DataTypes, Sequelize} from 'sequelize';

interface NftRecordAttributes {
  token_id: number;
  nft_id: number;
  from_address: string;
  to_address: string;
  price: number;
  created_at: Date;
}

class Nft_record extends Model<NftRecordAttributes> {
  public token_id!: number;
  public nft_id!: number;
  public from_address!: string;
  public to_address!: string;
  public price!: number;
  public created_at!: Date;

  public static initModel(sequelize: Sequelize) {
    return Nft_record.init(
      {
        token_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nft_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        from_address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        to_address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Nft_record',
        tableName: 'nft_records',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  public static associate(db: any) {
    db.Nft_record.belongsTo(db.User, {
      foreignKey: 'nft_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export default Nft_record;
