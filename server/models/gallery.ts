import {Model, DataTypes, Sequelize} from 'sequelize';

interface GalleryAttributes {
  title: string;
  description: string;
  img_url: string;
  tags: string;
  date: string;
}

class Gallery extends Model<GalleryAttributes> {
  public title!: string;
  public description!: string;
  public img_url!: string;
  public tags!: string;
  public date!: string;

  public static initModel(sequelize: Sequelize) {
    return Gallery.init(
      {
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        img_url: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tags: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        date: {
          type: DataTypes.STRING(255),
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

export default Gallery;
