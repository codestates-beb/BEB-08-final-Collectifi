import express, { Request, Response, NextFunction } from "express";
import { ResponseData } from "./controllers";

export const main_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const success: ResponseData = {
      message: "welcome to NFT market!",
      data: { id: "hi", password: "it works!" },
    };
    res.send(success);
  } catch (e) {
    console.log(e);
  }
};
