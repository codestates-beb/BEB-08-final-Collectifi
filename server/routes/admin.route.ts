import express from 'express';
import {
  admin_login_post,
  admin_posts_get,
  admin_users_get,
  admin_comments_get,
  admin_blacklists_get,
  admin_post_delete,
  admin_comment_delete,
  admin_blacklist_delete,
  admin_user_blacklist,
} from '../controllers/admin.controller';

const router = express.Router();

// 관리자 로그인 요청
router.post('/login', admin_login_post);

// 불러오기
router.get('/users', admin_users_get);
router.get('/posts', admin_posts_get);
router.get('/comments', admin_comments_get);
router.get('/blacklists', admin_blacklists_get);

// 삭제하기
router.delete('/post', admin_post_delete);
router.delete('/comment', admin_comment_delete);
router.post('/user', admin_user_blacklist);
router.delete('/blacklist', admin_blacklist_delete);

export default router;
