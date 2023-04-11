import express, {Request, Response, NextFunction} from 'express';
import {Sequelize} from 'sequelize';
import Web3 from 'web3';
import {MyRequest} from '../@types/session';
import erc20abi from '../abi/erc20abi';
import erc721abi from '../abi/erc721abi';
import db from '../models';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CA);

export const drawing_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.session.user?.id;
    const address = req.session.user?.address;
    console.log('=======address=====', address);
    const {card_pack} = req.body;
    //db에서 card_pack별로 랜덤으로 하나 뽑기
    const data = await db.Nft_info.findOne({
      where: {
        card_pack,
        card_color: 0,
      },
      order: db.sequelize.random(),
    });
    //card_pack에 따라 토큰 받아오기
    // const setToken = await erc721Contract.methods
    //   .setToken(process.env.ERC20_CA)
    //   .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    const mintNftPrice = await erc20Contract.methods
      .transfer(process.env.SERVER_ADDRESS, card_pack == 0 ? 1500 : card_pack == 1 ? 3000 : 5000)
      .send({from: address, gas: 500000});
    //성공시 nft발급
    if (mintNftPrice) {
      const result = await erc721Contract.methods
        .mintNFT(address, data.img_url, data.player, data.season, 0)
        .send({from: process.env.SERVER_ADDRESS, gas: 500000});
      console.log('성공 ==============================');
      //minting한 토큰 아이디를 가져와서 db의 nft 정보를 업데이트
      const token_id = await erc721Contract.methods.getTokenId().call();
      if (result) {
        const mintedNft = await db.Nft.create({
          token_id,
          user_id: id,
          player: data.player,
          season: data.season,
          team: data.team,
          card_color: data.card_color,
          img_url: data.img_url,
          isSell: false,
        });
        //데이터 베이스에서 뽑은 Nft_info정보 삭제
        const deleteNftInfo = await db.Nft_info.destroy({
          where: {
            id: data.id,
          },
        });
        //업데이트 된 유저의 정보를 검색 후 token_amount를 업데이트
        const user = await db.User.findOne({
          where: {
            id,
          },
        });
        const withdraw = await user.decrement('token_amount', {
          by: card_pack == 0 ? 1500 : card_pack == 1 ? 3000 : 5000,
        });
        res.status(200).send({message: '민팅 성공', data: {mintedNft}});
      }
    }
  } catch (e) {
    res.status(400).send({message: '민팅 실패'});
    console.log(e);
  }
};
