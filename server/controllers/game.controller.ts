import express, {Request, Response, NextFunction} from 'express';
import Web3 from 'web3';
import {MyRequest} from '../@types/session';
import erc20abi from '../abi/erc20abi';
import soccerabi from '../abi/soccerabi';
import erc721abi from '../abi/erc721abi';
import db from '../models';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi, process.env.ERC721_CA);
const soccerContract = new web3.eth.Contract(soccerabi, process.env.SOCCER_CA);

export const game_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // const {game, value} = req.body;
    // const gameUserAddress = req.session.user?.address;

    // const totalToken = await soccerContract.methods.totalToken().call();
    // const token = await soccerContract.methods.winToken().call();

    // console.log('======totalToken=====', totalToken);
    // console.log('======token=====', token);

    // const tx = soccerContract.methods
    //   .fund(game)
    //   .send({from: gameUserAddress, value: value, gas: 500000});
    const {fromAddress, toAddress, tokenId} = req.body;
    const approve = await erc721Contract.methods
      .approve(process.env.SERVER_ADDRESS, tokenId)
      .send({from: fromAddress, gas: 500000});
    console.log('===============approve===========', approve);
    const transferFrom = await erc721Contract.methods
      .transferFrom(fromAddress, toAddress, tokenId)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    console.log('===============transferFrom===========', transferFrom);

    return res.status(200).send({message: '성공'});
  } catch (e) {
    console.log(e);
  }
};

export const game_post1 = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {game} = req.body;
    const gameUserAddress = req.session.user?.address;
    let token = 0;

    const totalToken = await soccerContract.methods.totalToken().call();

    if (game == 'win') {
      token = await soccerContract.methods.winToken().call();
    }
    if (game == 'lose') {
      token = await soccerContract.methods.loseToken().call();
    }
    if (game == 'draw') {
      token = await soccerContract.methods.drawToken().call();
    }

    const drainage = (totalToken / token).toFixed(2);

    const tx = soccerContract.methods
      .matchedReward(game, drainage)
      .send({from: gameUserAddress, gas: 500000});
  } catch (e) {
    console.log(e);
  }
};

export const game_fund_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {game, value} = req.body;
    const fromAddress = req.session.user?.address;
    console.log('======================', game, value, fromAddress);

    const approve = await erc20Contract.methods
      .approve(process.env.SERVER_ADDRESS, value)
      .send({from: fromAddress, gas: 500000});
    console.log('===========approve===========', approve);
    const fund = await soccerContract.methods
      .fund(fromAddress, game, value)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    console.log('=========fund=============', fund);
    const transferFrom = await erc20Contract.methods
      .transferFrom(fromAddress, process.env.SERVER_ADDRESS, value)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    console.log('=========transferFrom=============', transferFrom);
    return res.status(200).send({message: '성공'});
  } catch (e) {
    console.log(e);
  }
};

export const game_reward_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {game, drainage} = req.body;
    const fromAddress = req.session.user?.address;
    console.log('======================', game, drainage, fromAddress);

    const matchedReward = await soccerContract.methods
      .matchedReward(game, drainage)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    console.log('=======match====', matchedReward);
    return res.status(200).send({message: '성공'});
  } catch (e) {
    console.log(e);
  }
};
