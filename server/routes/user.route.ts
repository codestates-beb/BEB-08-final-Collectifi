import express from "express";

const router = express.Router();

import { mypage_get } from "../controllers/user.controller";

router.get("/:id", mypage_get);

export default router;
