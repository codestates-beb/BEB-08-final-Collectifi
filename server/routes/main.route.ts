import express from "express";

const router = express.Router();

import { main_get } from "../controllers/main.controller";

router.get("/", main_get);

export default router;
