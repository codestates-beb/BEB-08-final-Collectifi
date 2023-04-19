import {Config, Dialect, Sequelize} from 'sequelize';
import config_dev from '../config/config_dev';
import Nft from './nft';
import Nft_info from './nft_info';
import Post from './post';
import Post_comment from './post_comment';
import User from './user';
import Post_liked from './post_liked';
import Post_comment_liked from './post_comment_liked';
import Nft_record from './nft_record';
import Admin from './admin';
import Rank from './rank';

const env: string = process.env.NODE_ENV || 'development';
const config = config_dev;
const db: any = {};
//초기 값이 없어서 데이터 타입이 추론이 안되기에 as를 사용해 데이터 타입을 설정 해 준다.

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.User = User;
db.Nft = Nft;
db.Nft_info = Nft_info;
db.Post = Post;
db.Post_comment = Post_comment;
db.Post_liked = Post_liked;
db.Post_comment_liked = Post_comment_liked;
db.Nft_record = Nft_record;
db.Admin = Admin;
db.Rank = Rank;

User.initModel(sequelize);
Nft.initModel(sequelize);
Post.initModel(sequelize);
Post_comment.initModel(sequelize);
Nft_info.initModel(sequelize);
Post_liked.initModel(sequelize);
Post_comment_liked.initModel(sequelize);
Nft_record.initModel(sequelize);
Admin.initModel(sequelize);
Rank.initModel(sequelize);

//관계를 설정 해 준다.
User.associate(db);
Nft.associate(db);
Post.associate(db);
Post_comment.associate(db);
Post_liked.associate(db);
Post_comment_liked.associate(db);
Nft_record.associate(db);
Rank.associate(db);

export default db;
