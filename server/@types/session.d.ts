import { SessionData } from "express-session";
import express from "express";

interface User {
  id: number;
  nickname: string;
  address: string;
  token_amount: number;
  nft_amount: number;
}

interface MySessionData extends SessionData {
  user?: User;
  loggedIn?: boolean;
}

interface MyRequest extends express.Request {
  session: MySessionData;
}
