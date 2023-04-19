import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import Web3 from 'web3';
import erc20abi from '../abi/erc20abi';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
import bcrypt from 'bcrypt';

// 관리자 로그인
export const admin_login_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    console.log('hi');
    // 1. 프론트에서 username, password 받아오기
    const {username, password} = req.body;
    // 2. 비밀번호 hashing 하기
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    // 3. db admins의 정보와 확인
    const admin = await db.Admin.findOne({
      where: {
        username,
      },
    });
    // 3-2. 일치하지 않으면 돌려보냄
    if (!admin) {
      return sendResponse(res, 400, 'check username or password');
    }

    // 4. 세션을 관리자 자격으로 부여
    req.session.admin = true;
    // 5. 프론트로 돌려보냄
    return sendResponse(res, 200, 'user profile');
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

// users 불러오기
export const admin_users_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. users 모든 데이터 불러오기
    const users = await db.User.findAll();

    sendResponse(res, 200, 'user profile', {users});
  } catch (e) {
    console.log(e);
  }
};

// posts 불러오기
export const admin_posts_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. posts 모든 데이터 불러오기
    const posts = await db.Post.findAll();

    sendResponse(res, 200, 'posts', {posts});
  } catch (e) {
    console.log(e);
  }
};

// comments 불러오기
export const admin_comments_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. comments 모든 데이터 불러오기
    const comments = await db.Post_comment.findAll();

    sendResponse(res, 200, 'comments', {comments});
  } catch (e) {
    console.log(e);
  }
};
