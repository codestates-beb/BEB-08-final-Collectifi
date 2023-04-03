import express, { Request, Response, NextFunction } from "express";
import { ResponseData } from "./controllers";

export const community_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData: ResponseData = {
      message: "community page",
      data: { posts: "게시글들..." },
    };
    res.status(200).send(responseData);
  } catch (e) {
    console.log(e);
  }
};
