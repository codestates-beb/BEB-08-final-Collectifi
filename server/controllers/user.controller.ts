import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {ResponseData} from './controllers';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import Web3 from 'web3';
import erc20abi from '../abi/erc20abi';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);

// 마이페이지 (유저 프로필)
export const mypage_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. URL parameter로 해당 user의 id 받아오기
    const {id} = req.params;
    // 2. db에서 user 검색하기
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    // 2-2 정보가 없다면
    if (!user) {
      sendResponse(res, 400, '존재하지 않는 유저입니다');
    }

    // 마이페이지인지, 남의 페이지인지 확인
    const loggedInUserId = req.session.user?.id;
    const isOwner = Number(id) == loggedInUserId;

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
    // const result: ResponseData = {
    //   message: "user profile",
    //   data: { posts, nfts, user },
    // };
    sendResponse(res, 200, 'user profile', {posts, nfts, user, isOwner});
  } catch (e) {
    console.log(e);
  }
};

// 유저 프로필(닉네임) 수정
export const editProfile_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. session으로 해당 user의 id 받아오기
    const id = req.session.user?.id;
    // 2. front에서 수정한 닉네임 받아오기
    const {nickname} = req.body;
    // 3. db의 User 정보 업데이트
    const result = await db.User.update(
      {
        nickname,
      },
      {
        where: {id},
      },
    );
    // 4. res 보내주기

    sendResponse(res, 200, `닉네임을 ${nickname}으로 수정했습니다!`);
  } catch (e) {
    sendResponse(res, 400, '닉네임 변경 실패');

    console.log(e);
  }
};

// 추천인(레퍼럴) 등록
export const referral_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. session으로 해당 user의 id 받아오기
    const id = req.session.user?.id;
    const fromAddress = req.session.user?.address;
    // 2. front에서 추천인 주소 받아오기
    const {address} = req.body;
    // 3. db에서 주소로 해당 추천인 찾기
    const referralUser = await db.User.findOne({
      where: {
        address,
      },
    });
    console.log(referralUser.referral);

    // 3-2. 추천인을 찾지 못하면, 프론트에 알려주기
    if (!referralUser) {
      return sendResponse(res, 400, `Can't Find User by Address!`);
    }

    // 3-3. 이미 추천인을 입력했다면, 프론트에 알려주기

    const already = await db.User.findOne({
      where: {id},
    });

    if (already.referral) {
      return sendResponse(res, 400, 'You already register referral User!');
    }

    // 4. 컨트랙트 token 지급

    const rewardFrom = await erc20Contract.methods
      .transfer(fromAddress, 1000)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});

    const rewardTo = await erc20Contract.methods
      .transfer(address, 1000)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});

    // 5. 찾으면, 추천인 등록한 user의 db update (추천인 등록, token 지급)
    const updateUser = await db.User.update(
      {
        referral: address,
        token_amount: db.sequelize.literal('token_amount + 1000'),
      },
      {
        where: {id},
      },
    );

    // 6. 추천받은 user에 token 지급
    const incentive = await referralUser.increment('token_amount', {
      by: 1000,
    });

    // 7. front에 결과 전달
    return sendResponse(res, 200, `Success Enrolling Referral User !`);
  } catch (e) {
    console.log(e);
    sendResponse(res, 400, 'Error: Fail to register Referral User !');
  }
};
