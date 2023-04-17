import express from 'express';

const router = express.Router();

import {
  market_get,
  market_buy_post,
  market_sell_post,
  market_sell_get,
  market_apporve_nft_get,
  market_apporve_token_get,
  market_nft_get,
  market_nft_record_get,
} from '../controllers/market.controller';

router.get('/', market_get);
//nft 목록 불러오기
router.get('/nft/:id', market_nft_get);
//nft 거래기록 불러오기
router.get('/nft/record/:id', market_nft_record_get);
router.get('/sell', market_sell_get);
router.post('/sell', market_sell_post);
router.post('/buy', market_buy_post);
router.get('/nftapprove/:id', market_apporve_nft_get);
router.get('/tokenapprove/:balance', market_apporve_token_get);

export default router;
