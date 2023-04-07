import express from "express";

const router = express.Router();

import {market_get,market_buy_post,market_sell_post} from "../controllers/market.controller"

router.get("/list", market_get);
router.post("/buy",market_buy_post);
router.post("/sell",market_sell_post);

export default router;
