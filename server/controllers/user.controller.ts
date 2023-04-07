import express, { Request, Response, NextFunction } from "express";
import db from "../models";
import { ResponseData } from "./controllers";
import { MyRequest } from "../@types/session";

// 마이페이지 (유저 프로필)
export const mypage_get = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. URL parameter로 해당 user의 id 받아오기
    const { id } = req.params;
    // 2. db에서 user 검색하기
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    // 2-2 정보가 없다면
    if (!user) {
      res.status(404).send("유저 정보가 없습니다");
    }
    // 3. 해당 유저의 id로 post, nft 불러오기
    const posts = await db.Post.findAll({
      where: {
        user_id: id,
      },
    });

    const nfts = await db.Nft.findAll({
      where: {
        user_id: id,
      },
    });
    // 4. user 정보, posts, nfts 다 보내주기
    const result: ResponseData = {
      message: "user profile",
      data: { posts, nfts, user },
    };
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};
