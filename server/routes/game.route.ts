import express from 'express';
import {
  game_fund_post,
  game_post,
  game_post1,
  game_reward_post,
} from '../controllers/game.controller';

const router = express.Router();

router.post('/', game_post);
router.post('/admin', game_post1);
router.post('/fund', game_fund_post);
router.post('/reward', game_reward_post);

export default router;
