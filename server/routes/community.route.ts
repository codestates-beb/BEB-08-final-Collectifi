import express from "express";
import {
  community_get,
  post_post,
  detail_get,
  comment_post,
  like_post,
  editPost_post,
  editPost_get,
  deletePost_delete,
  likeComment_post,
} from "../controllers/community.controller";

const router = express.Router();

router.get("/", community_get);
router.post("/post", post_post);

router.get("/:id", detail_get);

router.get("/:id/edit", editPost_get);
router.post("/:id/edit", editPost_post);
router.delete("/:id/delete", deletePost_delete);

router.post("/:id/like", like_post);

router.post("/:id/comment", comment_post);
router.post("/comment/:id", likeComment_post);

export default router;
