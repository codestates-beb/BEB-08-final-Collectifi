import express, {Request, Response, NextFunction} from 'express';
import db from '../models';
import {ResponseData} from './controllers';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';
import Web3 from 'web3';
import erc20abi from '../abi/erc20abi';
import donation_ethAbi from '../abi/donation_ethAbi';
import donation_colAbi from '../abi/donation_colAbi';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const donation_eth_Contract = new web3.eth.Contract(donation_ethAbi, process.env.DONATION_ETH_CA);
const donation_col_Contract = new web3.eth.Contract(donation_colAbi, process.env.DONATION_COL_CA);

// 기부 페이지
export const donation_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    let donations = [];

    const title = await donation_eth_Contract.methods.title().call();
    const img_url = await donation_eth_Contract.methods.img_url().call();
    const targetAmount = await donation_eth_Contract.methods.targetAmount().call();
    const raisedAmount = await donation_eth_Contract.methods.raisedAmount().call();
    const targetEth = web3.utils.fromWei(targetAmount, 'ether');
    const raisedEth = web3.utils.fromWei(raisedAmount, 'ether');
    const percent = ((raisedAmount / targetAmount) * 100).toFixed(1);

    donations.push({title, img_url, targetAmount, raisedAmount, targetEth, raisedEth, percent});

    const coltitle = await donation_col_Contract.methods.title().call();
    const colimg_url = await donation_col_Contract.methods.img_url().call();
    const coltargetAmount = await donation_col_Contract.methods.targetAmount().call();
    const colraisedAmount = await donation_col_Contract.methods.raisedAmount().call();
    const coltargetEth = web3.utils.fromWei(coltargetAmount, 'ether');
    const colraisedEth = web3.utils.fromWei(colraisedAmount, 'ether');
    const colpercent = ((colraisedAmount / coltargetAmount) * 100).toFixed(1);

    donations.push({
      title: coltitle,
      img_url: colimg_url,
      targetAmount: coltargetAmount,
      raisedAmount: colraisedAmount,
      targetEth: coltargetEth,
      raisedEth: colraisedEth,
      percent: colpercent,
    });

    sendResponse(res, 200, 'donation_get', {donations});
  } catch (e) {
    console.log(e);
    sendResponse(res, 400, 'error');
  }
};

// COL 기부 컨트롤러 (ETH 기부는 프론트에서 모든 것을 해결)
export const donation_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 세션으로 user address 받아오기
    const address = req.session?.user?.address;
    // 2. 기부할 amount 받아오기
    const {amount} = req.body;
    // 3. address를 donation_col CA에게 approve
    const approve = await erc20Contract.methods
      .approve(process.env.DONATION_COL_CA, amount)
      .send({from: address, gas: 500000});
    // 4. amount를 컨트랙트에 전달
    const donate = await donation_col_Contract.methods
      .fund(address, amount)
      .send({from: address, gas: 500000});

    // 5. db 상에서도 amount만큼 차감
    const userId = req.session?.user?.id;
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    const withdrawDB = await user.decrement('token_amount', {by: amount});

    sendResponse(res, 200, 'success donation');
  } catch (e) {
    console.log(e);
    sendResponse(res, 400, 'fail donation');
  }
};
