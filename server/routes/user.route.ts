import express from 'express';

const router = express.Router();

import {mypage_get, editProfile_post, referral_post} from '../controllers/user.controller';

router.get('/:id', mypage_get);
router.post('/edit', editProfile_post);
router.post('/referral', referral_post);

export default router;
