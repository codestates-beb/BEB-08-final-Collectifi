import {Request, Response, NextFunction} from 'express';
import {ResponseData} from './controllers';
import db from '../models';
import Web3 from 'web3';
import erc20abi from '../abis/erc20Abi';
import {MyRequest} from '../@types/session';
import {sendResponse} from './utils';

// 글 목록 페이지
export const community_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. db에서 posts 가져오기 (페이지네이션 고려해서)
    const pages: any = req.query.page;
    const page = parseInt(pages) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    //
    const posts = await db.Post.findAll({
      order: [['id', 'DESC']],
      limit,
      offset,
      include: [
        {
          model: db.User,
          attributes: ['nickname'],
        },
        {
          model: db.Post_comment,
          attributes: ['content'],
        },
      ],
      include: [
        {
          model: db.User,
          attributes: ['nickname'],
        },
        {
          model: db.Post_comment,
          attributes: ['content'],
        },
      ],
    });

    // 2. 프론트에 보내주기
    const result: ResponseData = {
      message: 'query posts complete',
      data: {posts},
    };
    sendResponse(res, 200, '글 목록 불러오기 성공', posts);
  } catch (e) {
    sendResponse(res, 400, '글 목록 불러오기 실패!');
    console.log(e);
  }
};

// 글쓰기
export const post_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. front에서 데이터 받아오기
    const {title, content} = req.body;
    console.log('================title===============', title);
    console.log('================title===============', title);
    // 2. session에서 user 추출
    const id = req.session.user?.id;
    console.log('================id=================', id);
    console.log('================id=================', id);

    // 3. id로 user 찾기
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    //4. DB에 post 저장하기
    const post = await db.Post.create({
      user_id: id,
      title: title,
      content: content,
    });
    //5. 잘 저장되었다면, erc-20 토큰을 보상으로 1개 주기
    if (post) {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(`http://127.0.0.1:${process.env.GANACHE_PORT}`),
      );

      const contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
      const giveToken = await contract.methods
        .transfer(user.address, 1)
        .send({from: process.env.SERVER_ADDRESS, gas: 500000});
        .send({from: process.env.SERVER_ADDRESS, gas: 500000});
      if (giveToken) {
        //6. 블록체인에서 토큰을 주었다면, db의 token_amount도 1 올려주기
        const incrementToken = await user.increment('token_amount', {by: 1});
      }
    }

    // 8. 프론트에 알려주기

    sendResponse(res, 200, '글 등록 성공!');
  } catch (e) {
    sendResponse(res, 400, '글 등록 실패!');
    console.log(e);
  }
};

// 글 디테일 페이지
export const detail_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //1. URL params에서 post_id 가져오기
    console.log(req.params);
    const id = req.params.postId;
    console.log(id);
    //2. DB에서 해당 포스트 불러오기
    const post = await db.Post.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.User,
          attributes: ['nickname'],
        },
        {
          model: db.Post_comment,
          attributes: ['content'],
        },
      ],
      },
      include: [
        {
          model: db.User,
          attributes: ['nickname'],
        },
        {
          model: db.Post_comment,
          attributes: ['content'],
        },
      ],
    });
    // 3. DB에서 해당 포스트의 댓글 불러오기
    // const comments = await db.Post_comment.findAll({
    //   where: {
    //     post_id: id,
    //   },


    // });
    // 조회수 증가
    const result = await post.increment('views', {by: 1});

    if (!post) {
      sendResponse(res, 400, '게시물을 찾을 수 없음');
    }
    //3. 포스트의 user_id로 user 찾기
    const user = await db.User.findOne({
      where: {
        id: post.user_id,
      },
    });
    const address = user.address;
    //3. 프론트로 user의 address와, post 데이터 보내주기
    sendResponse(res, 200, '게시물을 성공적으로 가져왔습니다.', {post, address});
  } catch (error) {
    sendResponse(res, 400, '게시물 가져오기 실패.');
  }
};

// 글 좋아요 / 싫어요
export const like_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 로그인한 유저인지 확인 + user 정보 받아오기
    const user = req.session.user;
    // 1-1. 로그인 안했으면 돌려보냄
    if (!user) {
      sendResponse(res, 400, '로그인을 먼저 하세요');
    }
    // 2. params에 있는 id로 해당 글을 검색
    const {postId} = req.params;
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });

    // 2. 좋아요 / 싫어요인지 체크
    const {data} = req.body;
    if (!data) {
      sendResponse(res, 400, '요청 실패');
    }
    // 3-1. 좋아요 경우 post의 likes를 1 증가
    if (data === 'likes') {
      const increaseLike = await post.increment('likes', {by: 1});
    }
    // 3-2. 싫어요 경우 post의 dislikes를 1 증가
    else if (data === 'dislikes') {
      const increaseDislike = await post.increment('dislikes', {by: 1});
    }
    // 4. 게시글 '좋아요'가 10,50,100,200,300,400,500일 경우 글쓴이에 토큰 지급
    // const editedPost = await db.Post.findOne({
    //   where: {
    //     id,
    //   },
    // });

    // const thumbUp = [10,50,100,200,300,400,500];
    // for(let i = 0 ; i < thumbUp.length ; i++) {

    //   if(editedPost.likes - editedPost.dislikes == thumbUp[i]) {

    //   }
    // }
    sendResponse(res, 200, '좋아요/싫어요 누르기 성공');
  } catch (error) {
    sendResponse(res, 400, '좋아요/싫어요 누르기 실패');
    console.log(error);
  }
};

// 글 수정하기
export const editPost_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 프론트에서 post id, 기존 title, content 받기
    const {postId} = req.params;

    // 2. session의 user와 post를 작성한 user가 일치하는지 확인
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });
    const {title, content} = post;
    const userId = req.session.user?.id;
    // 2-2. 일치 안하면 돌려보내
    if (post.user_id != userId) {
      sendResponse(res, 400, '작성자가 아닙니다.');
    }
    // 3. 본래 title, content를 프론트에 전달하기
    sendResponse(res, 200, '성공했습니다.', {title, content});
  } catch (error) {
    sendResponse(res, 400, '작성자가 아닙니다.');

    console.log(error);
  }
};

export const editPost_patch = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. post의 id 찾기, user 찾기
    const {postId} = req.params;
    const user = req.session.user;
    const {title, content} = req.body;

    // 2. post의 글쓴이가 session의 user인지 확인
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });
    // 아니면 돌려보내기
    if (post.user_id != user?.id) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 3. db post title, content 내용 업데이트
    const result = await db.Post.update({title, content}, {where: {id: postId}});
    // 4. 프론트에 성공했다 알려주기
    sendResponse(res, 200, '성공했습니다.');
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');
    console.log(error);
  }
};

// 글 삭제하기

export const deletePost_delete = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. post의 id 찾기, user 찾기
    const {postId} = req.params;
    const user = req.session.user;

    // 2. post의 글쓴이가 session의 user인지 확인
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });
    // 아니면 돌려보내기
    if (post.user_id != user?.id) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 3. 해당 post 삭제
    const result = await db.Post.destroy({where: {id: postId}});
    // 4. 프론트에 성공했다 알려주기
    sendResponse(res, 200, '성공했습니다');
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');

    console.log(error);
  }
};

// 댓글 작성
export const comment_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 게시글 id,content / user 가져오기
    const {
      body: {content},
      params: {postId},
    } = req;
    console.log('===========req.params==========', req.params);
    console.log('===========req.params==========', req.params);
    const userId = req.session.user?.id;
    console.log('========id==========', postId);
    console.log('========id==========', postId);

    console.log(typeof userId, typeof Number(postId), typeof postId, typeof content);
    console.log(typeof userId, typeof Number(postId), typeof postId, typeof content);

    // 2. Comment 추가
    const comment = await db.Post_comment.create({
      user_id: userId,
      post_id: Number(postId),
      content,
      content,
    });
    console.log(comment);
    // 4.

    //3. 프론트로 post 데이터 보내주기
    sendResponse(res, 200, '성공했습니다');
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');
  }
};

// 댓글 좋아요 / 싫어요
export const likeComment_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 로그인한 유저인지 확인 + user 정보 받아오기
    const user = req.session.user;
    // 1-1. 로그인 안했으면 돌려보냄
    if (!user) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 2. front 에서 해당 comment의 id 받아오기
    const {commentId} = req.params;
    const {data} = req.body;
    const comment = await db.post_comments.findOne({
      where: {
        id: commentId,
      },
    });
    // 2. 좋아요 / 싫어요인지 체크
    if (!data) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 3-1. 좋아요 경우 post의 likes를 1 증가
    if (data === 'likes') {
      const increaseLike = await comment.increment('likes', {by: 1});
    }
    // 3-2. 싫어요 경우 post의 dislikes를 1 증가
    else if (data === 'dislikes') {
      const increaseDislike = await comment.increment('dislikes', {by: 1});
    }
    sendResponse(res, 200, '성공했습니다');
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');

    console.log(error);
  }
};

// 댓글 수정

export const editComment_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. 프론트에서 comment id, 기존 , content 받기
    const {commentId} = req.params;
    const {content} = req.body;
    // 2. session의 user와 comment 작성한 user가 일치하는지 확인
    const comment = await db.Post_comment.findOne({
      where: {
        id: commentId,
      },
    });
    const userId = req.session.user?.id;
    // 2-2. 일치 안하면 돌려보내
    if (comment.user_id != userId) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 3. 본래 content를 프론트에 전달하기
    sendResponse(res, 200, '성공했습니다', content);
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');

    console.log(error);
  }
};

export const editComment_patch = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. comment의 id , user , content 찾기
    const {commentId} = req.params;
    const user = req.session.user;
    const {content} = req.body;

    // 2. comment의 글쓴이가 session의 user인지 확인
    const comment = await db.Post_comment.findOne({
      where: {
        id: commentId,
      },
    });
    // 아니면 돌려보내기
    if (comment.user_id != user?.id) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 3. db comment title, content 내용 업데이트
    const result = await db.Post_comment.update({content}, {where: {id: commentId}});
    // 4. 프론트에 성공했다 알려주기
    sendResponse(res, 200, '성공했습니다');
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');
    console.log(error);
  }
};

// 댓글 삭제

export const deleteComment_delete = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    // 1. comment의 id 찾기, user 찾기
    const {commentId} = req.params;
    const user = req.session.user;

    // 2. post의 글쓴이가 session의 user인지 확인
    const comment = await db.Post_comment.findOne({
      where: {
        id: commentId,
      },
    });
    // 아니면 돌려보내기
    if (comment.user_id != user?.id) {
      sendResponse(res, 400, '실패했습니다');
    }
    // 3. 해당 post 삭제
    const result = await db.Post_comment.destroy({where: {commentId}});
    // 4. 프론트에 성공했다 알려주기
    sendResponse(res, 200, '성공했습니다');
  } catch (error) {
    sendResponse(res, 400, '실패했습니다');
    console.log(error);
  }
};
