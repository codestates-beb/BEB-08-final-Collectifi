import {Model, DataTypes, Sequelize} from 'sequelize';

interface Nft_galleryAttributes {
  gallery_id: number;
  nft_id: number;
  nft_end_time: string;
  isWithdraw: boolean;
}

class Nft_gallery extends Model<Nft_galleryAttributes> {
  public gallery_id!: number;
  public nft_id!: number;
  public nft_end_time!: string;
  public isWithdraw!: boolean;

  public static initModel(sequelize: Sequelize) {
    return Nft_gallery.init(
      {
        gallery_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nft_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nft_end_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        isWithdraw: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },      
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Nft_gallery',
        tableName: 'nft_gallerys',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  public static associate(db: any) {
    db.Nft_gallery.belongsTo(db.Gallery, {
      foreignKey: "gallery_id",
      targetKey: "id",
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Nft_gallery.belongsTo(db.Nft, {
      foreignKey: "nft_id",
      targetKey: "id",
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
}

export default Nft_gallery;
