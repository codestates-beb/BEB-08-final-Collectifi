import express from "express";
import { upgrade_get, upgrade_post } from "../controllers/upgrade.controller";

const router = express.Router();

router.get("/",upgrade_get);
router.post("/",upgrade_post)

export default router;