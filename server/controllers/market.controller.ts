import express, {Request, Response, NextFunction} from 'express';
import Web3 from 'web3';
import {MyRequest} from '../@types/session';
import erc20abi from '../abi/erc20abi';
import erc721abi from '../abi/erc721abi';
import db from '../models';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CA);

//판매중인 NFT 목록 조회
export const market_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nfts = await db.Nft.findAll({
      where: {isSell: true},
      include: {
        model: db.User,
        attributes: ['nickname'],
      },
    });
    res.status(200).send({message: 'nft 목록 불러오기 성공', data: nfts});
  } catch (e) {
    res.status(400).send({message: 'nft 목록 불러오기 실패'});

    console.log(e);
  }
};

//자신이 가지고 있는 NFT 중 판매 할수 있는 NFT 목록 조회(판매 페이지)
export const market_sell_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.session.user?.id;
    console.log('=====id====', id);
    const nfts = await db.Nft.findAll({
      where: {isSell: false, user_id: id}, //세션 아이디 받아오기
    });
    res.status(200).send({message: '성공', data: nfts});
  } catch (e) {
    res.status(400).send({message: '실패'});

    console.log(e);
  }
};

export const market_nft_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {token_id} = req.body;
    const nft = await db.Nft.findOne({
      where: {token_id},
    });
    return res.status(200).send({message: '성공', data: {nft}});
  } catch (e) {
    console.log('ERROR:: ', e);
    res.status(400).send({message: '실패했습니다.'});
  }
};

//보유하고 있는 NFT 판매 상태로 만들기(판매 등록)
export const market_sell_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {selling_price, token_id} = req.body;
    const fromAddress = req.session.user?.address;
    const nftOwnerAddress = await erc721Contract.methods.ownerOf(token_id).call();

    //판매 등록을 할때 소유자가 판매 금액을 작성하면 contract NFT 정보들 중 price가 업데이트
    if (nftOwnerAddress == fromAddress) {
      const nftModify = await db.Nft.update(
        {
          isSell: true,
          selling_price,
        },
        {
          where: {token_id: token_id},
        },
      );
    }

    res.status(200).send({message: '판매 등록 성공했습니다'});
  } catch (e) {
    res.status(400).send({message: '실패했습니다'});

    console.log(e);
  }
};

export const market_apporve_token_get = async (
  req: MyRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {balance} = req.body;
    const approve = await erc20Contract.methods.approve(process.env.ERC721_CA, balance).encode();
    return res.status(200).send({message: '성공', data: {approve, erc20ca: process.env.ERC20_CA}});
  } catch (e) {
    console.log('ERROR:: ', e);
    res.status(400).send({message: '실패했습니다.'});
  }
};

export const market_apporve_nft_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {token_id} = req.body;
    const approve = await erc721Contract.methods
      .approve(process.env.SERVER_ADDRESS, token_id)
      .encode();
    return res
      .status(200)
      .send({message: '성공', data: {approve, erc721ca: process.env.ERC721_CA}});
  } catch (e) {
    console.log('ERROR:: ', e);
    res.status(400).send({message: '실패했습니다.'});
  }
};

//판매중인 NFT 구매
export const market_buy_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //판매중인 NFT 정보 받아오기
    const {selling_price, token_id, user_id} = req.body;
    console.log('=======selling_price, token_id, user_id===', selling_price, token_id, user_id);
    const toUserId = req.session.user?.id;
    console.log('=======toUserIdd===', toUserId);

    const nftOwnerAddress = await erc721Contract.methods.ownerOf(token_id).call();
    console.log('=======nftOwnerAddress===', nftOwnerAddress);

    //구매자의 지갑 주소
    const toAddress = req.session.user?.address;
    console.log('=======toAddress===', toAddress);

    //판매자의 유저 정보 조회
    const seller = await db.User.findOne({
      where: {
        id: user_id,
      },
    });
    console.log('=======seller===', seller);

    const fromAddress = seller.address;
    console.log('=======fromAddress===', fromAddress);
    console.log('=======toAddress', nftOwnerAddress);

    //구매자의 토큰 잔액이 판매 가격보다 많은지 조회
    const balance = await erc20Contract.methods.balanceOf(toAddress).call();
    console.log(balance);
    if (balance >= selling_price) {
      console.log('=======안녕===');

      if (nftOwnerAddress == fromAddress) {
        console.log('=======하이===');

        //확인 후 NFT옮기는 권한을 부여한 후 NFT 소유권 이동 및 토큰 수량 업데이트
        const safeTransferFrom = await erc721Contract.methods
          .transferNFT(fromAddress, toAddress, token_id, selling_price)
          .send({from: process.env.SERVER_ADDRESS, gas: 500000});

        console.log('=========safe============', safeTransferFrom);

        const nftModify = await db.Nft.update(
          {
            isSell: false,
            price: selling_price,
            user_id: toUserId,
            selling_price: 0,
          },
          {
            where: {token_id: token_id},
          },
        );
        //구매자와 판매자의 토큰 수량 업데이트
        const buyer = await db.User.findOne({
          where: {
            id: toUserId,
          },
        });
        const sellerModify = await seller.increment('token_amount', {by: selling_price});
        const buyerModify = await buyer.decrement('token_amount', {by: selling_price});
        return res.status(200).send({message: '구매에 성공했습니다'});
      }
    }
    return res.status(400).send({message: '오류가 발생했습니다'});
  } catch (e) {
    console.log('ERROR:: ', e);
    res.status(400).send({message: '실패했습니다.'});
  }
};
