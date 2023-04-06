import express from "express";

const router = express.Router();

import { login_post } from "../controllers/main.controller";

router.post("/login", login_post);

export default router;
