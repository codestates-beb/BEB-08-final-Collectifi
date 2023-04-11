import {Response} from 'express';

export const sendResponse = (res: Response, statusCode: number, message: string, data = {}) => {
  res.status(statusCode).send({
    message,
    data,
  });
};
