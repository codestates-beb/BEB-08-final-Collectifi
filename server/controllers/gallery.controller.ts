import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import bcrypt from 'bcrypt';
import erc20abi from '../abi/erc20abi';
import erc721abi from '../abi/erc721abi';
import Web3 from 'web3';

const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CA);

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
    const id = req.params;

    // 2. 해당 gallery에 올라간 nft들
    const nft_ids = db.Nft_gallery.findAll({
      where: {
        gallery_id: id,
      },
    });

    // 3. nft들의 nft_id로 Nft에서 찾기 (user정보도 함께)
    let nfts: object[] = [];
    await nft_ids.map((nft: any) => {
      const info = db.Nft.findOne({
        where: {
          id: nft.nft_id,
        },
        include: [
          {
            model: db.User,
            attributes: ['nickname'],
          },
        ],
      });
      nfts.push(info);
    });

    // 4. front에 nfts 보내주기

    return sendResponse(res, 200, 'gallery detail', {nfts});
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

// 전시회에 nft 등록하기
export const gallery_nft_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. params에서 galleryId, session에서 user id 가져오기
    const id: any = req.params;
    const user_id = req.session.user?.id;

    // 2. id = 0 / 1 / 2 에 따라 내 nft들 중 가능한 nft 불러오기
    // 2-1. real madrid 컬렉션일 경우
    let myNfts = [];
    if (id === 0) {
      myNfts = await db.Nft.findAll({
        where: {
          id: user_id,
          season: '2021-2022',
          team: 'Real Madrid',
        },
        include: [
          {
            model: db.User,
            attributes: ['nickname'],
          },
        ],
      });
      // 2-2. messi & ronaldo 컬렉션일 경우
    } else if (id === 1) {
      myNfts = await db.Nft.findAll({
        where: {
          id: user_id,
          player: {
            [db.Op.or]: ['Lionel Messi', 'Cristiano Ronaldo'],
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
    } else if (id === 2) {
      myNfts = await db.Nft.findAll({
        where: {
          id: user_id,
          player: {
            [db.Op.or]: ['Steven Gerrard', 'Fernando Torres'],
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

//
export const gallery_nft_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
  } catch (e) {
    console.log(e);
    return sendResponse(res, 400, 'error');
  }
};

// nft_approve
export const gallery_apporve_nft_get = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token_id = req.params.id;
    const approve = await erc721Contract.methods
      .approve(process.env.SERVER_ADDRESS, token_id)
      .encodeABI();
    return res
      .status(200)
      .send({message: '성공', data: {approve, erc721ca: process.env.ERC721_CA}});
  } catch (e) {
    console.log('ERROR:: ', e);
    return res.status(400).send({message: '실패했습니다.'});
  }
};

// nft_staking
