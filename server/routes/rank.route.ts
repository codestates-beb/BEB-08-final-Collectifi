import express from 'express';
import {rank_get} from '../controllers/rank.controller';

const router = express.Router();

router.get('/', rank_get);

export default router;
