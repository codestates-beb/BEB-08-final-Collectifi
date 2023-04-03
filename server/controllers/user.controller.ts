import express, { Request, Response, NextFunction } from "express";

export const mypage_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("mypage");
  } catch (e) {
    console.log(e);
  }
};
