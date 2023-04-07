import express, { Request, Response } from "express";
import router from "./routes";
import  db  from './models';
import morgan from "morgan"
import path from "path"

const app = express();

type Data = {
  name: string;
  age: number;
  url: string;
};

const sendData: Data = {
  name: "joo",
  age: 26,
  url: "hi",
};

db.sequelize.sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결됨.');
   }).catch((err:Error) => {
      console.error(err);
   });



app.use(morgan('dev')); // 로그
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({extended: false})); // uri 파싱

app.use("/", router);

const corsOptions = {
  origin: true,
  credentials: true,
};

app.listen(8000, () => {
  console.log("server listening...");
});
