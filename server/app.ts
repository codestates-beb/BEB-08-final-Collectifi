import express, { Request, Response } from "express";
import router from "./routes";

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

app.use("/", router);

app.listen(8000, () => {
  console.log("server listening...");
});
