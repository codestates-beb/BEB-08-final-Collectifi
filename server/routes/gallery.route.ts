import express from 'express';
import {
  gallery_apporve_nft_get,
  gallery_detail_get,
  gallery_get,
} from '../controllers/gallery.controller';

const router = express.Router();

router.get('/', gallery_get);
router.get('/:galleryId', gallery_detail_get);
router.get('/nftapprove/:id', gallery_apporve_nft_get);

export default router;
