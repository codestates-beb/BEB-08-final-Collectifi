import { Model, DataTypes, Sequelize } from 'sequelize';

interface Nft_infoAttributes {
    id:number;
    player:string;
    grade:number;
    level:number;
    season:string;
    img_url:string;
}

class Nft_info extends Model<Nft_infoAttributes> {
    public id!: number;
    public player!: string;
    public grade!: number;
    public level!: number;
    public season!: string;
    public img_url!: string;

    public static initModel(sequelize: Sequelize) {
        return Nft_info.init(
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false,
            },
            player: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            grade: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            season: {
                type: DataTypes.STRING(255),
                allowNull: false,
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
            modelName: 'Nft_info',
            tableName: 'nft_infos',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
        );
    }
}

export default Nft_info;