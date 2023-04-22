import express from 'express';
import {
  gallery_stake_get,
  gallery_detail_get,
  gallery_nft_get,
  gallery_get,
  gallery_nft_post,
  gallery_mypage_detail_get,
  gallery_withdraw_get,
  gallery_withdraw_post
} from '../controllers/gallery.controller';

const router = express.Router();

router.get('/', gallery_get);
router.get('/:galleryId', gallery_detail_get);
router.get('/nft/:galleryId', gallery_nft_get);
router.post('/nft', gallery_nft_post);
router.get('/stake/:id/:unlockTime', gallery_stake_get);
router.get('/withdraw/:id/', gallery_withdraw_get);
router.get('/mypage/:userId', gallery_mypage_detail_get);
router.post('/withdraw', gallery_withdraw_post);

export default router;
