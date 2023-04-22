import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
const { Op } = require('sequelize')
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import bcrypt from 'bcrypt';
import erc20abi from '../abi/erc20abi';
import erc721abi from '../abi/erc721abi';
import galleryabi from '../abi/galleryabi';
import Web3 from 'web3';

const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CA);
const gallContract = new web3.eth.Contract(galleryabi, process.env.GALLERY_CA);

// 갤러리 페이지
export const gallery_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. db에서 gallerys 가져오기
    const gallerys = await db.Gallery.findAll({});
    console.log(gallerys);

    // 2. 프론트로 보내주기
    return sendResponse(res, 200, 'galleries', {gallerys});
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

// 전시 상세 페이지
export const gallery_detail_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. params에서 galleryId 가져오기
    const { galleryId } = req.params;

    // 2. 해당 gallery에 올라간 nft들
    // const nft_ids = await db.Nft_gallery.findAll({
    //   where: {
    //     gallery_id: galleryId,
    //   },
    // });
    // console.log(galleryId, nft_ids)
    // // 3. nft들의 nft_id로 Nft에서 찾기 (user정보도 함께)
    // let nfts: object[] = [];
    // await nft_ids.map((nft: any) => {
    //   const info = db.Nft.findOne({
    //     where: {
    //       id: nft.nft_id,
    //     },
    //     include: [
    //       {
    //         model: db.User,
    //         attributes: ['nickname'],
    //       },
    //     ],
    //   });
    //   nfts.push(info);
    // }); 

    const nfts = await db.Nft_gallery.findAll({
      where: {
        gallery_id: galleryId,
        nft_end_time: {
          [Op.gte]: db.sequelize.literal('NOW()'),
        },
      },
      include: [{
        model: db.Nft,
        required: true,
        include: [
          {
            model: db.User,
            attributes: ['nickname'],
          },
        ]
      }]    
    });

    // 4. front에 nfts 보내주기
    return sendResponse(res, 200, 'gallery detail', {nfts});
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

// 전시회에 따라 nft 가져오기
export const gallery_nft_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. params에서 galleryId, session에서 user id 가져오기
    const { galleryId }: any = req.params;
    const user_id = req.session.user?.id;

    // 2. id = 0 / 1 / 2 에 따라 내 nft들 중 가능한 nft 불러오기
    // 2-1. real madrid 컬렉션일 경우
    let myNfts = [];
    if (Number(galleryId) === 1) {
      myNfts = await db.Nft.findAll({
        where: {
          user_id: user_id,
          season: '2021-2022',
          team: 'Real Madrid',
          isSell: 0,
          token_id: {
            [Op.notIn]: db.sequelize.literal(
              `(SELECT nft_id FROM nft_gallerys WHERE gallery_id=${Number(galleryId)} and nft_end_time >= NOW())`
            ),
          },
        },
        include: [
          {
            model: db.User,
            attributes: ['nickname'],
          },
        ],
      });
      // 2-2. messi & ronaldo 컬렉션일 경우
    } else if (Number(galleryId) === 2) {
      myNfts = await db.Nft.findAll({
        where: {
          user_id: user_id,
          isSell: 0,
          player: {
            [Op.or]: ['Lionel Messi', 'Cristiano Ronaldo'],
          },
          token_id: {
            [Op.notIn]: db.sequelize.literal(
              `(SELECT nft_id FROM nft_gallerys WHERE gallery_id=${Number(galleryId)} and (nft_end_time >= NOW() ))`
            ),
          },
        },
        include: [
          {
            model: db.User,
            attributes: ['nickname'],
          },
        ],
      });
      //2-3. gerrard & torres 컬렉션일 경우
    } else if (Number(galleryId) === 3) {
      myNfts = await db.Nft.findAll({
        where: {
          user_id: user_id,
          isSell: 0,
          player: {
            [Op.or]: ['Steven Gerrard', 'Fernando Torres'],
          },
          token_id: {
            [Op.notIn]: db.sequelize.literal(
              `(SELECT nft_id FROM nft_gallerys WHERE gallery_id=${Number(galleryId)} and nft_end_time >= NOW())`
            ),
          },
        },
        include: [
          {
            model: db.User,
            attributes: ['nickname'],
          },
        ],
      });
    }

    // 3. front로 myNfts 보내주기
    return sendResponse(res, 200, 'gallery detail', {myNfts});
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

//갤러리 등록
export const gallery_nft_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const nftRecord = await db.Nft_gallery.create({
      gallery_id: req.body.gallery_id,
      nft_id: req.body.nft_id,
      nft_end_time: req.body.nft_end_time,
      isWithdraw: 0
    });
    return sendResponse(res, 200, 'succese');
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

// nft stake
export const gallery_stake_get = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token_id = req.params.id;
    const unlockTime = req.params.unlockTime;

    const approve = await erc721Contract.methods
      .approve(process.env.GALLERY_CA, token_id)
      .encodeABI();
    const stake = await gallContract.methods
      .stake(token_id, unlockTime)
      .encodeABI();
    return res
      .status(200)
      .send({message: '성공', data: {approve, stake, gallca: process.env.GALLERY_CA, erc721ca: process.env.ERC721_CA}});
  } catch (e) {
    console.log('ERROR:: ', e);
    return res.status(400).send({message: '실패했습니다.'});
  }
};

// nft withdraw
export const gallery_withdraw_get = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
) => {  
  try {
    const token_id = req.params.id;
    const withdraw = await gallContract.methods
      .withdraw(token_id)
      .encodeABI();
    return res
      .status(200)
      .send({message: '성공', data: {withdraw, gallca: process.env.GALLERY_CA}});
  } catch (e) {
    console.log('ERROR:: ', e);
    return res.status(400).send({message: '실패했습니다.'});
  }
};

//마이페이지 전시회탭
export const gallery_mypage_detail_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const nfts = await db.Nft.findAll({
      where: {
        user_id: userId,
        //isSell: 0,        
      },
      include: [
        {
          model: db.Nft_gallery,
          required: true,
          where: {
            isWithdraw: 0,
          },
          include: [
            {
              model: db.Gallery
            }
          ]
        },
      ],
    });

    return sendResponse(res, 200, 'succese', {nfts});
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

//withdraw 결과저장
export const gallery_withdraw_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const result = await db.Nft_gallery.update(
      { isWithdraw: true }, 
      { where: {
        gallery_id: req.body.gallery_id,
        nft_id: req.body.nft_id,
      }}
    );

    return sendResponse(res, 200, 'succese');
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};