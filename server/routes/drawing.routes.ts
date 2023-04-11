import express from "express";
import { drawing_post } from "../controllers/drawing.controller";

const router = express.Router();



router.post("/",drawing_post);

export default router;