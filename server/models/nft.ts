import { Model, DataTypes, Sequelize } from 'sequelize';

interface NftAttributes {
    token_id:number;
    user_id:number;
    player:string;
    season:string;
    states:string;
    level:number;
    price: number;
    img_url:string;
}

class Nft extends Model<NftAttributes> {
    public token_id!: number;
    public user_id!: number;
    public player!: string;
    public season!: string;
    public states!: string;
    public level!: number;
    public price!: number;
    public img_url!: string;

    public static initModel(sequelize: Sequelize) {
        return Nft.init(
        {
            token_id:{
                type:DataTypes.INTEGER,
                allowNull:true,
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
            states: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            img_url: {
                type: DataTypes.STRING(255),
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
        }
        );
    }

      public static associate(db: any) {
       db.Nft.belongsTo(db.User, {
          foreignKey: 'user_id',
          targetKey: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      }
}

export default Nft;