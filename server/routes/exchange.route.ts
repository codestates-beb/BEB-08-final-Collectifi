import express from 'express';
import {
  Factory_post,
  Liquidity_account_post,
  Liquidity_post,
  Swap_account_post,
  Swap_post,
} from '../controllers/exchange.controller';

const router = express.Router();

router.post('/factory', Factory_post);
router.post('/liquidityaccount', Liquidity_account_post);
router.post('/liquidity', Liquidity_post);
router.post('/swapaccount', Swap_account_post);
router.post('/swap', Swap_post);

export default router;
