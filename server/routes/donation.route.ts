import express from 'express';
import {
  donation_get,
  donation_post,
  donation_refund_post,
} from '../controllers/donation.controller';

const router = express.Router();

router.get('/', donation_get);
router.post('/', donation_post);
router.post('/refund', donation_refund_post);

export default router;
