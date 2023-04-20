import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import bcrypt from 'bcrypt';
import erc20abi from '../abi/erc20abi';
import soccerabi from '../abi/soccerabi';
import Web3 from 'web3';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const soccerContract = new web3.eth.Contract(soccerabi, process.env.SOCCER_CA);

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
    const posts = await db.Post.findAll({order: [['id', 'DESC']]});

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

// blacklists 불러오기
export const admin_blacklists_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. blacklists 모든 데이터 불러오기
    const blacklists = await db.Blacklist.findAll();

    sendResponse(res, 200, 'blacklists', {blacklists});
  } catch (e) {
    console.log(e);
  }
};

// 특정 post 삭제하기
export const admin_post_delete = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. front에서 post id 받아오기
    const {id} = req.body;
    // 3. 해당 post 삭제
    const result = db.Post.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 400, 'Fail to find the post');
    }
    // 4. front에 응답 보내주기
    sendResponse(res, 200, 'Delete the Post Successfully');
  } catch (e) {
    console.log(e);
    sendResponse(res, 400, 'Error : Fail to find the post');
  }
};

// 특정 comment 삭제하기
export const admin_comment_delete = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. front에서 comment id 받아오기
    const {id} = req.body;
    // 3. 해당 comment 삭제
    const result = db.Post_comment.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 400, 'Fail to find the Comment');
    }
    // 4. front에 응답 보내주기
    return sendResponse(res, 200, 'Delete the Comment Successfully');
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'Error : Fail to find the Comment');
  }
};

// 특정 user 삭제하기 => 밴하기
export const admin_user_blacklist = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. front에서 user address 받아오기
    const {address} = req.body;

    // 2.5 DB에 해당 address가 존재하는지
    const blacklistExist = await db.Blacklist.findOne({
      where: {
        address: address,
      },
    });
    if (blacklistExist) {
      console.log('이미 존재 합니다');
      return sendResponse(res, 400, 'Already exists.');
    }

    // 3. 해당 address를 블랙리스트에 등록
    const addBlackList = await db.Blacklist.create({
      address,
    });

    // // 4. 해당 user 삭제
    // const result = db.User.destroy({
    //   where: {
    //     address,
    //   },
    // });
    // if (!result) {
    //   return sendResponse(res, 400, 'Fail to find the user');
    // }
    // 4. front에 응답 보내주기
    return sendResponse(res, 200, addBlackList);
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'Error : Fail to ban the user');
  }
};

// 특정 blacklist 삭제하기
export const admin_blacklist_delete = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //1. 관리자인지 확인
    const admin = req.session.admin;
    if (!admin) {
      return sendResponse(res, 403, 'You are not Authorized');
    }
    //2. front에서 user address 받아오기
    const {address} = req.body;

    // 3. 해당 blacklist 삭제
    const result = db.Blacklist.destroy({
      where: {
        address,
      },
    });
    if (!result) {
      return sendResponse(res, 400, 'Fail to find the blacklist');
    }
    // 4. front에 응답 보내주기
    return sendResponse(res, 200, 'Delete the blacklist Successfully');
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'Error : Fail to find the blacklist');
  }
};

// win탭 get
export const admin_win_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // contract로 부터 총 모인 토큰 / 승무패 각각에 건 토큰 / 배당 정보 불러오기
    const totalToken = await soccerContract.methods.totalToken().call();

    const winToken = await soccerContract.methods.winToken().call();
    const loseToken = await soccerContract.methods.loseToken().call();
    const drawToken = await soccerContract.methods.drawToken().call();

    const winDiainage = (totalToken / winToken).toFixed(2);
    const loseDiainage = (totalToken / loseToken).toFixed(2);
    const drawDiainage = (totalToken / drawToken).toFixed(2);

    return res.status(200).send({
      message: 'Success',
      data: {
        winDiainage: winDiainage,
        loseDiainage: loseDiainage,
        drawDiainage: drawDiainage,
        winToken: winToken,
        loseToken: loseToken,
        drawToken: drawToken,
        totalToken,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({message: 'Error'});
  }
};

// win 결과 입력 (토큰 분배)
export const admin_win_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 게임 결과 입력 (win/draw/lost)
    const {game} = req.body;
    let token = 0;
    // 배수 계산 (총 모인 토큰 / 맞춘 토큰)
    const totalToken = await soccerContract.methods.totalToken().call();

    if (game == 'win') {
      token = await soccerContract.methods.winToken().call();
      console.log('hereeee');
    }
    if (game == 'lose') {
      token = await soccerContract.methods.loseToken().call();
    }
    if (game == 'draw') {
      token = await soccerContract.methods.drawToken().call();
    }

    // const drainage = totalToken / token;

    // // 승부예측 contract에 erc20 approve 권한 부여
    // const approve = await erc20Contract.methods
    //   .approve(process.env.SOCCER_CA, totalToken)
    //   .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    // // 승부 맞춘 이들에게 분배
    // const matchedReward = await soccerContract.methods
    //   .matchedReward(game, drainage)
    //   .send({from: process.env.SERVER_ADDRESS, gas: 500000});

    console.log('=======match====');
    return res.status(200).send({message: 'Success!'});
  } catch (e) {
    console.log(e);
    return res.status(400).send({message: 'Error'});
  }
};
