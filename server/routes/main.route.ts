import express from 'express';

const router = express.Router();

import {dummy_get, login_post, logout_post, checklogin_get} from '../controllers/main.controller';

router.post('/login', login_post);
router.post('/logout', logout_post);
router.get('/checklogin', checklogin_get);
router.get('/dummy', dummy_get);

export default router;
