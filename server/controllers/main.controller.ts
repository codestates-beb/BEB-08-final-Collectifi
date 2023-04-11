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
      return sendResponse(res, 200, '로그인 성공!', user);
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

//NFT_info 데이터 삽입
export const dummy_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // nft_info 10개 더미데이터 삽입
    for (let i = 0; i < 5; i++) {
      let bronzecards = await db.Nft_info.create({
        player: `messi${i}`,
        season: `201${i}`,
        team: `FC Barcelona`,
        card_pack: 0,
        card_color: 0,
        img_url:
          'https://gateway.pinata.cloud/ipfs/QmP2Y8eJ2iYsqPkfXhrxC6TQ3Co7SvariVE9M8PF62oxtD?filename=3-1.png',
      });

      let silvercards = await db.Nft_info.create({
        player: `messi${i}`,
        season: `201${i}`,
        team: `FC Barcelona`,
        card_pack: 0,
        card_color: 1,
        img_url:
          'https://gateway.pinata.cloud/ipfs/QmapWhXK9dbx89vZyKZxQ2K7L5myhkG8Ebd9c1MWFeBam9?filename=3-2.png',
      });

      let goldcards = await db.Nft_info.create({
        player: `messi${i}`,
        season: `201${i}`,
        team: `FC Barcelona`,
        card_pack: 0,
        card_color: 2,
        img_url:
          'https://gateway.pinata.cloud/ipfs/QmVo6VHwEbZJcV7HKWFAenpCv9HWhp4XTLMdCzAm9ugXEx?filename=3-3.png',
      });
    }
  } catch (e) {
    sendResponse(res, 400, '로그인에 실패했습니다');
    console.log(e);
  }
};
