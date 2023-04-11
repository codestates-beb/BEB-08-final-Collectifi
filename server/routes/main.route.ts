import express from 'express';

const router = express.Router();

import {dummy_get, login_post} from '../controllers/main.controller';

router.post('/login', login_post);
router.get('/dummy', dummy_get);

export default router;
