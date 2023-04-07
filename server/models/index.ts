// import {Config, Dialect, Sequelize}  from "sequelize";
// import config_dev from "../config/config_dev";
// import Nft from "./nft";
// import Nft_info from "./nft_info";
// import Post from "./post";
// import Post_comment from "./post_comment";
// import User from "./user";

// const config  = config_dev;

// const db: any = {};

// // new Sequelize를 통해 MySQL 연결 객체를 생성한다.
// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// // 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
// db.sequelize = sequelize; 
// db.User = User;
// db.Nft = Nft;
// db.Nft_info = Nft_info;
// db.Post = Post;
// db.Post_comment = Post_comment;

// User.initModel(sequelize);
// Nft.initModel(sequelize);
// Post.initModel(sequelize);
// Post_comment.initModel(sequelize);
// Nft_info.initModel(sequelize);

// User.associate(db);
// Nft.associate(db);
// Post.associate(db);
// Post_comment.associate(db);

// // 모듈로 꺼낸다.
// export default db;

import { Config, Dialect, Sequelize } from "sequelize";
import config_dev from "../config/config_dev";
import Nft from "./nft";
import Nft_info from "./nft_info";
import Post from "./post";
import Post_comment from "./post_comment";
import User from "./user";

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

User.initModel(sequelize);
Nft.initModel(sequelize);
Post.initModel(sequelize);
Post_comment.initModel(sequelize);
Nft_info.initModel(sequelize);

//관계를 설정 해 준다.
User.associate(db);
Nft.associate(db);
Post.associate(db);
Post_comment.associate(db);

export default db;

// interface Db {
//   sequelize: Sequelize;
//   User: typeof User;
//   Nft: typeof Nft;
//   Nft_info: typeof Nft_info;
//   Post: typeof Post;
//   Post_comment: typeof Post_comment;
// }
