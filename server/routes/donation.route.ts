import express from 'express';
import {donation_get, donation_post} from '../controllers/donation.controller';

const router = express.Router();

router.get('/', donation_get);
router.post('/', donation_post);

export default router;
