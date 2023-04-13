import express from 'express';
import {game_post, game_post1} from '../controllers/game.controller';

const router = express.Router();

router.post('/', game_post);
router.post('/admin', game_post1);

export default router;
