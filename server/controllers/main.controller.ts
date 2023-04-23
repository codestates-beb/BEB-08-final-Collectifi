import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import Web3 from 'web3';
import erc20abi from '../abi/erc20abi';
import {nft_infos} from './nft_infos';
import {data} from './dummy_posts';
import bcrypt from 'bcrypt';
import {gallerys} from './dummy_gallery';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);

// 홈페이지는 프론트에서 서비스 소개 페이지로 대체 될 예정

// 로그인
export const login_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 프론트에서 메타마스크 연결시 지갑 주소 받아오기

    if (!req.body.address) {
      return sendResponse(res, 400, '메타마스크 연결을 확인하세요');
    }
    const {address} = req.body;
    console.log('========address========', address);

    // 2. DB에 같은 address 있는지 확인
    const exists = await db.User.findOne({
      where: {
        address,
      },
    });
    console.log('=====exists====', exists);
    // 2-2.없다면 db에 새로운 user 생성
    if (!exists) {
      console.log('whyy');

      const user = await db.User.create({
        nickname: 'unnamed',
        address,
        token_amount: 500000,
      });
      const reward = await erc20Contract.methods
        .joinReward(address)
        .send({from: process.env.SERVER_ADDRESS, gas: 500000});
      console.log('=====user====', user);

      // 3. session에 해당 user 정보 저장
      req.session.loggedIn = true;
      req.session.user = user;
      console.log('session', req.session.user);
      return sendResponse(res, 200, '로그인 성공!', user);
    }
    // 3. session에 해당 user 정보 저장
    req.session.loggedIn = true;
    req.session.user = exists;
    console.log('세션', req.session.user?.id);
    return sendResponse(res, 200, '로그인 성공!', exists);
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, '로그인에 실패했습니다');
  }
};

// 로그아웃
export const logout_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    req.session.user = null;
    req.session.loggedIn = false;
    sendResponse(res, 200, '로그아웃 성공');
  } catch (e) {
    sendResponse(res, 400, '로그아웃 실패');
    console.log(e);
  }
};

//로그인 확인
export const checklogin_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.session.user) throw new Error(`not login`);
    const id = req.session.user.id;
    const result = await db.User.findOne({
      where: {
        id,
      },
    });
    sendResponse(res, 200, '로그인 상태', result);
  } catch (e) {
    sendResponse(res, 400, '로그인 상태X');
    console.log(e);
  }
};

//더미 데이터 삽입
export const dummy_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //더미 User 10개 만들고 넣기
    for (let i = 0; i < 10; i++) {
      let users = await db.User.create({
        nickname: `user${i}`,
        address: `xdf3234${i}`,
        token_amount: 1000,
      });
    }

    // //Admin 1개 넣기
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('1234', saltRounds);

    const admin = await db.Admin.create({
      username: 'admin',
      password: hashedPassword,
    });

    // Post 더미 데이터 200개 넣기
    data.map((item, index) => {
      const posts = db.Post.create({
        user_id: Math.floor(Math.random() * 10 + 1),
        title: item.title,
        content: item.content,
        likes: index,
      });
    });

    // Gallery 더미 데이터 3개 넣기
    gallerys.map(item => {
      const datas = db.Gallery.create({
        title: item.title,
        description: item.description,
        img_url: item.img_url,
        tags: item.tags,
        date: item.date,
      });
    });

    // Post_comment 더미 데이터 5개 넣기 DB가 바뀌어서 사용 X
    // for (let i = 0; i < 5; i++) {
    //   let users = await db.Post_comment.create({
    //     user_id: Math.floor(Math.random() * 10 + 1),
    //     post_id: 200,
    //     content: 'hello testttt',
    //     likes: 50,
    //     dislikes: 50,
    //   });
    // }

    // Nft_info 데이터 넣기
    nft_infos.map(item => {
      const result = db.Nft_info.create({
        player: item.player,
        season: item.season,
        team: item.team,
        card_pack: item.card_pack,
        card_color: item.card_color,
        img_url: item.img_url,
        team_record: item.team_record,
        man_record: item.man_record,
      });
    });
    // //판매중인 Nft 데이터 넣기 (마켓 테스트 위한)
    // nft_infos.slice(0, 12).map(item => {
    //   const selling_nfts = db.Nft.create({
    //     token_id: 1,
    //     user_id: 1,
    //     player: item.player,
    //     season: item.season,
    //     team: item.team,
    //     card_color: 0,
    //     price: 500,
    //     selling_price: 500,
    //     img_url: item.img_url,
    //     isSell: true,
    //     team_record: item.team_record,
    //     man_record: item.man_record,
    //   });
    // });

    sendResponse(res, 200, '데이터 삽입 완료');
  } catch (e) {
    sendResponse(res, 400, '로그인에 실패했습니다');
    console.log(e);
  }
};
