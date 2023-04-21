import express from 'express';
import router from './routes';
import db from './models';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import session from 'express-session';

import {Store} from 'express-session';
import SequelizeStoreConstructor from 'connect-session-sequelize';

const app = express();

db.sequelize
  .sync({force: false})
  .then(() => {
    console.log('데이터베이스 연결됨.');
  })
  .catch((err: Error) => {
    console.error(err);
  });

app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: false})); // uri 파싱
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

interface SessionStore extends Store {
  sync: () => Promise<void>;
}

const SequelizeStore = SequelizeStoreConstructor(session.Store);

const sequelizeStore = new SequelizeStore({
  db: db.sequelize, // Your Sequelize instance
}) as unknown as SessionStore;

app.use(
  session({
    secret: 'Hello!',
    resave: false,
    saveUninitialized: false,
    store: sequelizeStore,
    rolling: false,
    cookie: {
      httpOnly: false,
      //   secure: true,
      //   sameSite: 'none',
      maxAge: 3600000,
    },
  }),
);

app.use('/', router);

// const interval = () => {
//   setInterval(() => console.log('hi'), 5000);
// };

// app.use(interval);

const setRank = async () => {
  // 1. db rank에서 이전 랭커들 찾기
  const prevRankers = await db.Rank.findAll();
  // 2. db User에서 해당 랭커들의 user 필드 비워주기
  console.log(prevRankers);
  prevRankers.map((rank: any) => {
    const result = db.User.update({rank: 0}, {where: {id: rank.user_id}});
  });
  // 3. db Post들 중에서 likes가 가장 높은 post 3개 뽑아오기
  const posts = await db.Post.findAll({
    order: [['likes', 'DESC']],
    limit: 3,
  });
  console.log(posts);
  // 4. db rank 테이블 비우기
  const empty = await db.Rank.destroy({
    where: {},
    truncate: true,
  });

  // 5. db rank 테이블에 posts 3개 삽입
  posts.map((post: any, index: number) => {
    const result = db.Rank.create({
      post_id: post.id,
      user_id: post.user_id,
      likes: post.likes,
      ranking: index + 1,
    });
  });

  // 6. db user의 rank 테이블 업데이트
  posts.map((post: any, index: number) => {
    const result = db.User.update({rank: index + 1}, {where: {id: post.user_id}});
  });
};

setRank();

// setInterval(setRank, 5000);

app.listen(8000, () => {
  console.log('server listening...');
});
