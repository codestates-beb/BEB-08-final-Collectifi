import express from "express";

const router = express.Router();

import main from "./main.route";
import user from "./user.route";

router.use("/", main);
router.use("/user", user);

export default router;
