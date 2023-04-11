import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import Web3 from 'web3';
import erc20abi from '../abi/erc20abi';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);

// 홈페이지는 프론트에서 서비스 소개 페이지로 대체 될 예정

// 로그인
export const login_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 프론트에서 메타마스크 연결시 지갑 주소 받아오기

    if (!req.body.address) {
      sendResponse(res, 400, '메타마스크 연결을 확인하세요');
    }
    const {address} = req.body;
    console.log('address', address);

    // 2. DB에 같은 address 있는지 확인
    const exists = await db.User.findOne({
      where: {
        address,
      },
    });
    // 2-2.없다면 db에 새로운 user 생성
    if (!exists) {
      const user = await db.User.create({
        nickname: 'unnamed',
        address,
        token_amount: 1000,
      });
      const reward = await erc20Contract.methods
        .joinReward(address)
        .send({from: process.env.SERVER_ADDRESS, gas: 500000});

      // 3. session에 해당 user 정보 저장
      req.session.loggedIn = true;
      req.session.user = user;
      sendResponse(res, 200, '로그인 성공!', user);
    }
    // 3. session에 해당 user 정보 저장
    req.session.loggedIn = true;
    req.session.user = exists;
    sendResponse(res, 200, '로그인 성공!', exists);
  } catch (e) {
    sendResponse(res, 400, '로그인에 실패했습니다');
    console.log(e);
  }
};
