import express from "express";

const router = express.Router();

import main from "./main.route";
import user from "./user.route";
import market from "./market.route"

router.use("/", main);
router.use("/user", user);
router.use("/market",market)

export default router;
