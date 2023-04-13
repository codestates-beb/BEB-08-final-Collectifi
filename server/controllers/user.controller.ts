import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {ResponseData} from './controllers';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';

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
