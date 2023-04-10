import express from "express";
import router from "./routes";
import db from "./models";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import session from "express-session";

import { Store } from "express-session";
import SequelizeStoreConstructor from "connect-session-sequelize";

const app = express();

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err: Error) => {
    console.error(err);
  });

app.use(morgan("dev")); // 로그
app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
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
    secret: "Hello!",
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
  })
);

app.use("/", router);

app.listen(8000, () => {
  console.log("server listening...");
});
