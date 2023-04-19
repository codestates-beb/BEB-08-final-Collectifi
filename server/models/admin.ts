import {Model, DataTypes, Sequelize} from 'sequelize';

interface AdminAttributes {
  username: string;
  password: string;
}

class Admin extends Model<AdminAttributes> {
  public username!: string;
  public password!: string;

  public static initModel(sequelize: Sequelize) {
    return Admin.init(
      {
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Admin',
        tableName: 'admins',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
}

export default Admin;
