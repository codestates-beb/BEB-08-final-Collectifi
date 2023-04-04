import {Config, Dialect, Sequelize}  from "sequelize";
import config_dev from "../config/config_dev";
import Nft from "./nft";
import Nft_info from "./nft_info";
import Post from "./post";
import Post_comment from "./post_comment";
import User from "./user";


const env: string = process.env.NODE_ENV || 'development'; // 지정된 환경변수가 없으면 'development'로 지정

// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러온다고 말할 수 있다.


const config  = config_dev;

const db: any = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize; 
db.User = User;
db.Nft = Nft;
db.Nft_info = Nft_info;
db.Post = Post;
db.Post_comment = Post_comment;

User.initModel(sequelize);
Nft.initModel(sequelize);
Post.initModel(sequelize);
Post_comment.initModel(sequelize);
Nft_info.initModel(sequelize);

User.associate(db);
Nft.associate(db);
Post.associate(db);
Post_comment.associate(db);

// 모듈로 꺼낸다.
export default db;