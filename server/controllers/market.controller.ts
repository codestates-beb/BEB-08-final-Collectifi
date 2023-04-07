import express, { Request, Response, NextFunction } from "express";
import Web3 from "web3";
import erc20abi from "../abi/erc20abi";
import erc721abi from "../abi/erc721abi";
import db from "../models";
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi,process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721abi,process.env.ERC721_CA);

export const market_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nfts = await db.Nft.findAll({
        where:{isSell:true}
    })
    res.status(200).send({data:nfts});
  } catch (e) {
    console.log(e);
  }
};

export const market_sell_get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const nfts = await db.Nft.findAll({
          where:{isSell:false}//세션 아이디 받아오기
      })
      res.status(200).send({data:nfts});
    } catch (e) {
      console.log(e);
    }
  };

export const market_buy_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {price,toAddress,token_id} = req.body;
    const user_id = req.body.user_id;
    const nftOwnerAddress = await erc721Contract.methods.ownerOf(token_id).call();
    
    const seller = await db.User.findOne({
        where:{
            id:user_id}
    })

    const fromAddress = seller.address;

    if(await erc20Contract.methods.balanceOf(toAddress) >= price){
        if(nftOwnerAddress == fromAddress){
            await erc721Contract.methods.transferNFT(fromAddress,toAddress,token_id)
            .send({from:fromAddress,gas:500000});
            await erc20Contract.methods.transfer(fromAddress,price)
            .send({from:toAddress,gas:500000});

            const nftModify = await db.Nft.update({
                isSell:false,
                price
            },{
                where:{token_id:token_id}
            })

        }
    }
    
    res.send("market");
  } catch (e) {
    console.log(e);
  }
};


export const market_sell_post = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {price,fromAddress,token_id} = req.body;
    //   const fromAddress = req.session.user?.address;
      const nftOwnerAddress = await erc721Contract.methods.ownerOf(token_id).call();

      

    if(nftOwnerAddress == fromAddress){
        await erc721Contract.methods.setPrice(token_id,price)
        .send({from:process.env.SERVER_ADDRESS,gas:500000})

        const nftModify = await db.Nft.update({
            isSell:true,
            price
        },{
            where:{token_id:token_id}
        })

    }
      
      res.send("market");
    } catch (e) {
      console.log(e);
    }
  };