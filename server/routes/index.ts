import express from 'express';

const router = express.Router();

import main from './main.route';
import user from './user.route';
import market from './market.route';
import community from './community.route';
import drawing from './drawing.routes';
import upgrade from './upgrade.route';
import game from './game.route';
import exchange from './exchange.route';
import donation from './donation.route';
import admin from './admin.route';
import gallery from './gallery.route';
import rank from './rank.route';

router.use('/', main);
router.use('/user', user);
router.use('/market', market);
router.use('/drawing', drawing);
router.use('/community', community);
router.use('/upgrade', upgrade);
router.use('/game', game);
router.use('/exchange', exchange);
router.use('/donation', donation);
router.use('/admin', admin);
router.use('/gallery', gallery);
router.use('/rank', rank);

export default router;
