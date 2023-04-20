import {Model, DataTypes, Sequelize} from 'sequelize';

interface Nft_galleryAttributes {
  gallery_id: number;
  nft_id: number;
}

class Nft_gallery extends Model<Nft_galleryAttributes> {
  public gallery_id!: number;
  public nft_id!: number;

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
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Gallery',
        tableName: 'gallerys',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
}

export default Nft_gallery;
