import express, { Request, Response, NextFunction } from "express";
import { ResponseData } from "./controllers";
import db from "../models";
import { Session } from "express-session";
import { MyRequest } from "../@types/session";

// 홈페이지는 프론트에서 서비스 소개 페이지로 대체 될 예정

// 로그인
export const login_post = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. 프론트에서 메타마스크 연결시 지갑 주소 받아오기

    if (!req.body.address) {
      res.status(400).send({ message: "Metamask login error" });
    }
    const { address } = req.body;

    // 2. DB에 같은 address 있는지 확인
    const exists = await db.User.findOne({
      attributes: ["address"],
      where: {
        address,
      },
    });
    // 2-2.없다면 db에 새로운 user 생성
    if (!exists) {
      const user = await db.User.create({
        nickname: "unnamed",
        address,
        token_amount: 0,
        nft_amount: 0,
      });
      // 3. session에 해당 user 정보 저장
      req.session.loggedIn = true;
      req.session.user = user;
      const result: ResponseData = {
        message: "Login Complete",
        data:user
      };
      res.status(200).send(result);
    }

  } catch (e) {
    console.log(e);
  }
};
