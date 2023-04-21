import express, {Request, Response, NextFunction} from 'express';
import Web3 from 'web3';
import {MyRequest} from '../@types/session';
import erc20abi from '../abi/erc20abi';
import erc721abi from '../abi/erc721abi';
import db from '../models';
import {Sequelize} from 'sequelize';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CA);

export const upgrade_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //유저 정보,강화할 NFT들의 정보 가져오기
    const id = req.session.user?.id;
    const nfts = await db.Nft.findAll({
      where: {
        user_id: id,
        card_color: [0, 1],
      },
    });
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    console.log('============nft==========', nfts);
    res.status(200).send({message: '성공', data: {nfts, token_amount: user.token_amount}});
  } catch (e) {
    console.log(e);
  }
};
export const upgrade_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //user와 nft 정보를 받아와야 한다.
    const id = req.session.user?.id;
    const {nft} = req.body;
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    //색이 브론즈인 카드를 강화한다.
    if (nft.card_color == 0) {
      const isSuccess = Math.random() <= 0.99;
      const money = 1000;
      //보유한 토큰의 수가 강화 비용보다 많은지 확인한다.
      if (user.token_amount >= money) {
        //토큰을 회수하고 db에 업데이트 해준다.
        const withdraw = await erc20Contract.methods
          .transfer(process.env.SERVER_ADDRESS, money)
          .send({from: user.address, gas: 500000});
        const withdrawDB = await user.decrement('token_amount', {by: money});
        //강화 실패시 토큰만 회수한다.
        if (!isSuccess) {
          res.status(201).send({message: '강화에 실패하셨습니다.'});
        } else {
          //강화 성공시 다음 등급의 nft를 발급하고 기존의 nft는 서버 주소에 전달한다.
          const upgradeCard = await db.Nft_info.findOne({
            where: {
              player: nft.player,
              season: nft.season,
              card_color: nft.card_color + 1,
            },
          });
          const approve = await erc721Contract.methods
            .approve(process.env.SERVER_ADDRESS, nft.token_id)
            .send({from: user.address, gas: 500000});
          const transfer = await erc721Contract.methods
            .transferNFT(user.address, process.env.SERVER_ADDRESS, nft.token_id)
            .send({from: user.address, gas: 500000});
          const result = await erc721Contract.methods
            .mintNFT(user.address, upgradeCard.img_url, upgradeCard.player, upgradeCard.season, 0)
            .send({from: process.env.SERVER_ADDRESS, gas: 500000});
          //다음 등급의 nft를 db에 업데이트해준다
          const token_id = await erc721Contract.methods.getTokenId().call();
          if (result) {
            const mintedNft = await db.Nft.create({
              token_id,
              user_id: id,
              player: upgradeCard.player,
              season: upgradeCard.season,
              team: upgradeCard.team,
              card_color: upgradeCard.card_color,
              img_url: upgradeCard.img_url,
              isSell: false,
              team_record: upgradeCard.team_record,
              man_record: upgradeCard.man_record,
            });
            //데이터 베이스에서 뽑은 Nft_info정보 삭제
            const deleteNftInfo = await db.Nft_info.destroy({
              where: {
                id: upgradeCard.id,
              },
            });
            //강화 성공 후 전 card_color의 nft 정보 삭제
            const deleteNft = await db.Nft.destroy({
              where: {
                id: nft.id,
              },
            });
            return res.status(200).send({message: '성공했습니다.', data: {mintedNft}});
          }
        }
      }
    }
    if (nft.card_color == 1) {
      const isSuccess = Math.random() <= 0.3;
      const money = 1000;
      //보유한 토큰의 수가 강화 비용보다 많은지 확인한다.
      if (user.token_amount >= money) {
        //토큰을 회수하고 db에 업데이트 해준다.
        const withdraw = await erc20Contract.methods
          .transfer(process.env.SERVER_ADDRESS, money)
          .send({from: user.address, gas: 500000});
        const withdrawDB = await user.decrement('token_amount', {by: money});
        //강화 실패시 토큰만 회수한다.
        if (!isSuccess) {
          res.status(201).send({message: '강화에 실패하셨습니다.'});
        } else {
          //강화 성공시 다음 등급의 nft를 발급하고 기존의 nft는 서버 주소에 전달한다.
          const upgradeCard = await db.Nft_info.findOne({
            where: {
              player: nft.player,
              season: nft.season,
              card_color: nft.card_color + 1,
            },
          });
          const approve = await erc721Contract.methods
            .approve(process.env.SERVER_ADDRESS, nft.token_id)
            .send({from: user.address, gas: 500000});
          const transfer = await erc721Contract.methods
            .transferNFT(user.address, process.env.SERVER_ADDRESS, nft.token_id)
            .send({from: user.address, gas: 500000});
          const result = await erc721Contract.methods
            .mintNFT(user.address, upgradeCard.img_url, upgradeCard.player, upgradeCard.season, 0)
            .send({from: process.env.SERVER_ADDRESS, gas: 500000});
          //다음 등급의 nft를 db에 업데이트해준다
          const token_id = await erc721Contract.methods.getTokenId().call();
          if (result) {
            const mintedNft = await db.Nft.create({
              token_id,
              user_id: id,
              player: upgradeCard.player,
              season: upgradeCard.season,
              team: upgradeCard.team,
              card_color: upgradeCard.card_color,
              img_url: upgradeCard.img_url,
              isSell: false,
              team_record: upgradeCard.team_record,
              man_record: upgradeCard.man_record,
            });
            //데이터 베이스에서 뽑은 Nft_info정보 삭제
            const deleteNftInfo = await db.Nft_info.destroy({
              where: {
                id: upgradeCard.id,
              },
            });
            //강화 성공 후 전 card_color의 nft 정보 삭제
            const deleteNft = await db.Nft.destroy({
              where: {
                id: nft.id,
              },
            });
            res.status(200).send({message: '성공했습니다.', data: {mintedNft}});
          }
        }
      }
    }
  } catch (e) {
    res.status(400).send({message: '실패했습니다'});
    console.log(e);
  }
};
