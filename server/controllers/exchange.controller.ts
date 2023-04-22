import Web3 from 'web3';
import {MyRequest} from '../@types/session';
import express, {Request, Response, NextFunction} from 'express';
import erc20abi from '../abi/erc20abi'; //token abi로 변경하기
import factoryabi from '../abi/factoryabi';
import exchangeabi from '../abi/exchangeabi';
import db from '../models';

const web3 = new Web3(
  new Web3.providers.HttpProvider(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`),
);
const token = new web3.eth.Contract(erc20abi, process.env.ERC20_CA); // tokenabi,token_ca로 변경하기
const factory = new web3.eth.Contract(factoryabi, process.env.FACTORY_CA); // tokenabi,token_ca로 변경하기

const toWei: any = (value: any) => web3.utils.toWei(value.toString());
const toEther: any = (value: any) => web3.utils.fromWei(value);

////////////////////////////////////

// export const Exchange = async (req: MyRequest, res: Response, next: NextFunction) => {
//   try {
//     const address = await exchange.joinRewardAddress().call();
//     const loginUserAddress = req.session.user?.address;
//     const exchangeEtherBalance = await exchange.methods.getEthBalance().call();
//     const exchangeTokenBalance = await token.methods.balanceOf(process.env.EXCHANGE_CA).call();
//     await token.methods
//       .approve(process.env.EXCHANGE_CA, toWei(1000)) //권한은 변수로 주기
//       .send({from: loginUserAddress, gas: 500000}); //exchange의 ca
//     //유동성 추가
//     await exchange.methods
//       .addLiquidity(toWei(1000)) //토큰과 이더 수량은 변수로 받기
//       .send({from: loginUserAddress, value: BigInt(toEther(1000)), gas: 500000}); //토큰과 이더를 exchange ca에 전송
//     //스왑 실행
//     const outpubToken = await exchange.methods
//       .getOutputAmout(toWei(1), exchangeEtherBalance, exchangeTokenBalance)
//       .send({from: loginUserAddress, gas: 500000});

//     const ethToTokenSwap = await exchange.methods
//       .ethToTokenSwap(toWei(3.99))
//       .send({from: loginUserAddress, value: BigInt(toEther(1)), gas: 500000});
//   } catch {}
// };

// export const Factory_post = async (req: MyRequest, res: Response, next: NextFunction) => {
//   try {
//     //두가지 방법  1.FRONT에서 token의 CA를 받아와서 Exchange를 배포한다. 2.여기서 process.env.ERC20_CA로 배포한다.

//     const serverAddress = process.env.SERVER_ADDRESS;
//     console.log('==========serverAddress=============', serverAddress);
//     const createExchange1 = await factory.methods
//       .createExchange(process.env.ERC20_CA)
//       .send({from: serverAddress, gas: 50000000});
//     console.log('==========createExchange=============', createExchange1);
//     const getExchangeCA = await factory.methods.getExchange(process.env.ERC20_CA).call();
//     return res.status(200).send({message: '풀 생성 완료했습니다.'});
//     /////////////////////
//   } catch {
//     return res.status(400).send({message: 'Factory에서 오류가 발생했습니다.'});
//   }
// };

export const Liquidity_account_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {ethAmount} = req.body;
    const getExchangeCA = await factory.methods.getExchange(process.env.ERC20_CA).call();
    const exchange = new web3.eth.Contract(exchangeabi, getExchangeCA);
    const exchangeTokenBalance = await exchange.methods.tokenBalanceOf().call();
    const exchangeEthBalance = await exchange.methods.ethBalanceOf().call();
    const outputToken = (toWei(ethAmount) * exchangeEthBalance) / exchangeTokenBalance;

    console.log('========exchangeTokenBalance==========', exchangeTokenBalance);
    console.log('========exchangeEthBalance==========', exchangeEthBalance);
    if (exchangeTokenBalance == 0 || exchangeEthBalance == 0) {
      //최초의 유동성
      return res.status(200).send({message: '최초의 유동성', data: {}});
      console.log('========최초의 유동성==========');
    } else {
      console.log('========outputToken==========', outputToken);
      // const colToken = toEther(outputToken);
      // console.log('==========colToken=======', colToken);
      const ouputEthTokenAmount = outputToken / 10 ** 18;

      return res
        .status(200)
        .send({message: '유동성 추가', data: {outputToken: ouputEthTokenAmount}});
    }
  } catch {
    return res.status(400).send({message: 'outputAccount 실패했습니다.'});
  }
};

export const Liquidity_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    //두가지 방법  1.FRONT에서 token의 CA를 받아와서 Exchange를 배포한다. 2.여기서 process.env.ERC20_CA로 배포한다.
    const userAddress = req.session.user?.address;
    const {tokenAmount, ethAmount} = req.body;
    const getExchangeCA = await factory.methods.getExchange(process.env.ERC20_CA).call();
    const exchange = new web3.eth.Contract(exchangeabi, getExchangeCA);
    const exchangeTokenBalance = await exchange.methods.tokenBalanceOf().call();
    const exchangeEthBalance = await exchange.methods.ethBalanceOf().call();
    console.log(
      '=======exchangeTokenBalance============',
      exchangeTokenBalance,
      exchangeEthBalance,
    );
    const outputToken = (toWei(ethAmount) * exchangeEthBalance) / exchangeTokenBalance;
    console.log('==============outputToken=============', outputToken);
    const approve = await token.methods
      .approve(getExchangeCA, toWei(tokenAmount)) //권한은 변수로 주기
      .send({from: userAddress, gas: 5000000}); //exchange의 ca
    console.log('==============approve=============', approve);
    //유동성을 공급해준다.
    const liquidity = await exchange.methods
      .addLiquidity(toWei(tokenAmount)) //토큰과 이더 수량은 변수로 받기
      .send({from: userAddress, value: toWei(ethAmount), gas: 50000000});
    console.log('==============liquidity=============', liquidity);

    const ouputEthTokenAmount = outputToken / 10 ** 18;

    if (exchangeTokenBalance == 0 || exchangeEthBalance == 0) {
      //최초의 유동성
      return res.status(200).send({message: '최초의 유동성', data: {}});
    } else {
      return res
        .status(200)
        .send({message: '유동성 추가', data: {outputToken: ouputEthTokenAmount}});
    }
  } catch {
    return res.status(400).send({message: 'liquidity_post에서 오류가 발생했습니다.'});
  }
};

export const Swap_account_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {ethAmount} = req.body;
    const getExchangeCA = await factory.methods.getExchange(process.env.ERC20_CA).call();
    const exchange = new web3.eth.Contract(exchangeabi, getExchangeCA);
    const exchangeTokenBalance = await exchange.methods.tokenBalanceOf().call();
    const exchangeEthBalance = await exchange.methods.ethBalanceOf().call();
    const outputTokenAmount = await exchange.methods
      .getOutputAmountWithFee(toWei(ethAmount), exchangeEthBalance, exchangeTokenBalance)
      .call();

    const colAmount = outputTokenAmount / 10 ** 18;
    return res.status(200).send({message: 'outputAccount 성공했습니다.', data: {colAmount}});
  } catch {
    return res.status(400).send({message: 'outputAccount 실패했습니다.'});
  }
};
export const Swap_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {ethAmount} = req.body;
    const userAddress = req.session.user?.address;
    const getExchangeCA = await factory.methods.getExchange(process.env.ERC20_CA).call();
    const exchange = new web3.eth.Contract(exchangeabi, getExchangeCA);
    const exchangeTokenBalance = await exchange.methods.tokenBalanceOf().call();
    const exchangeEthBalance = await exchange.methods.ethBalanceOf().call();
    const outputTokenAmount = await exchange.methods
      .getOutputAmountWithFee(toWei(ethAmount), exchangeEthBalance, exchangeTokenBalance)
      .call();
    console.log('==============outputTokenAmount==================', outputTokenAmount);
    const ethToTokenSwap = await exchange.methods
      .ethToTokenSwap(outputTokenAmount)
      .send({from: userAddress, value: toWei(ethAmount), gas: 5000000});

    const user = await db.User.findOne({
      where: {
        address: userAddress,
      },
    });
    const ouputEthTokenAmount = (outputTokenAmount / 10 ** 18).toFixed(2);
    const tokenIncre = await user.increment('token_amount', {by: ouputEthTokenAmount});
    return res.status(200).send({message: 'swap에 성공했습니다.'});
  } catch {
    return res.status(400).send({message: 'swap에 실패했습니다.'});
  }
};
