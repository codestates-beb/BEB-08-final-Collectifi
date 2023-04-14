import express from 'express';
import {game_fund_get, game_fund_post, game_reward_post} from '../controllers/game.controller';

const router = express.Router();

router.post('/fund', game_fund_post);
router.post('/reward', game_reward_post);
router.get('/fund', game_fund_get);

export default router;
