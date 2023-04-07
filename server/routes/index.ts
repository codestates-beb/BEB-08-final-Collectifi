import express from "express";

const router = express.Router();

import main from "./main.route";
import user from "./user.route";
import community from "./community.route";

router.use("/", main);
router.use("/user", user);
router.use("/community", community);

export default router;
