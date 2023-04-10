import express from 'express';
import {
  community_get,
  post_post,
  detail_get,
  comment_post,
  like_post,
  editPost_patch,
  editPost_get,
  deletePost_delete,
  likeComment_post,
  editComment_get,
  editComment_patch,
  deleteComment_delete,
} from '../controllers/community.controller';

const router = express.Router();

// 커뮤니티 메인
router.get('/', community_get);
// 글쓰기
router.post('/post', post_post);
// 게시글 디테일
router.get('/:postId', detail_get);
// 게시글 수정
router.get('/:postId/edit', editPost_get);
router.patch('/:postId/edit', editPost_patch);
// 게시글 삭제
router.delete('/:postId/delete', deletePost_delete);
// 게시글 좋아요(싫어요)
router.post('/:postId/like', like_post);

// 댓글 쓰기
router.post('/:postId/comment', comment_post);
// 댓글 좋아요(싫어요)
router.post('/:postId/comment/:commentId/like', likeComment_post);
// 댓글 수정
router.get('/:postId/comment/:commentId/edit', editComment_get);
router.patch('/:postId/comment/:commentId/edit', editComment_patch);
// 댓글 삭제
router.delete('/:postId/comment/:commentId', deleteComment_delete);

export default router;
