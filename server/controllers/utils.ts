import {Response} from 'express';

export const sendResponse = (res: Response, message: string, data = {}) => {
  res.send({
    message,
    data,
  });
};
