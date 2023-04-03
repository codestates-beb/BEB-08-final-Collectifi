import express from "express";

const router = express.Router();

import { mypage_get } from "../controllers/user.controller";

router.get("/mypage", mypage_get);

export default router;
