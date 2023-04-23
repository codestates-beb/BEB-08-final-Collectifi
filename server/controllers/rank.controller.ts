import express, {Request, Response, NextFunction} from 'express';
import Web3 from 'web3';
import {MyRequest} from '../@types/session';

import db from '../models';
import {Sequelize} from 'sequelize';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);

export const rank_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // db rank 가져오기
    const ranks = await db.Rank.findAll({
      order: [['ranking', 'ASC']],
      include: [
        {
          model: db.User,
          attributes: ['nickname'],
        },
      ],
    });

    res.status(200).send({message: '성공', data: {ranks}});
  } catch (e) {
    console.log(e);
    res.status(400).send({message: '실패'});
  }
};
