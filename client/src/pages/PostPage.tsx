import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../components/UI/Button';
import axios from 'axios';
import styled from 'styled-components';
import {data} from '../data/data';
import {WriteButton, WriteForm, WriteInput, WriteLabel, WriteTextarea} from './WritePage';

interface PostAttributes {
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  views: number;
  Post_comments: Post_comment[];
}
interface User {
  nickname: string;
}

interface Post_comment {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  likes: number;
  dislikes: number;
  created_at: Date;
  User: User;
}

const Comment_likes = styled.span``;

const PostPage = ({setCurrentPage}: {setCurrentPage: (value: number) => void}) => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<PostAttributes | null>(null);
  const [comments, setComments] = useState<Post_comment[]>([]);
  // const [addedCommnet, setAddedCommnet] = useState<Post_comment[]>([]);

  // useEffect(() => {
  //   console.log('post: ', post);
  // }, [post]);

  // 1. 전체 댓글을 불러 온다 post_get
  // 2. 댓글을 추가로 작성한다 comment_post
  // 3. DB는 추가 된 상태이므로 다시 post_get요청을 한다
  // 4. 어떻게?

  // 바로 가져와서 comments 스테이트에 추가하나

  useEffect(() => {
    axios.get(`http://localhost:8000/community/${id}`, {withCredentials: true}).then(res => {
      setPost(res.data.data.post);
      setComments(res.data.data.comments);
      // setComments(prev => [...prev, res.data.data.comments]);

      console.log('res: ', res);
    });

    // if (id) {
    //   setPost(data[parseInt(id) - 1]);
    //   setCurrentPage(Math.ceil(parseInt(id) / 20));
    // }
  }, [id]);
  // 댓글 기능 관련
  const [comment, setCommnet] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/community/${id}/comment`,
        {content: comment},
        {withCredentials: true},
      )
      .then(res => {
        console.log(res);
        setComments(prev => [...prev, res.data.data.result]);
        // 댓글 입력창 공백으로
        setCommnet('');
        //todo 토스트 메세지로 작성 완료 알림
      });
  };

  // 댓글 좋아요 기능 관련
  const handleCommentLikes = (e: string) => {
    alert(e);
  };

  return (
    <div>
      {post && (
        <>
          <div>
            번호: {id} 작성자: {post.user_id} 날짜: {post.created_at}
          </div>
          <span>제목: {post.title}</span> <span>조회수: {post.views}</span>
          <div>내용: {post.content}</div>
          <div>
            {post.likes}
            <span>Likes</span> <span>DisLikes</span>
            {post.dislikes}
          </div>
          <Button onClick={() => navigate('/community')}>목록</Button>
          <div>
            {/* 댓글 뿌려주는 부분 */}
            {comments?.map(comment => (
              <div key={comment.id}>
                {comment.User.nickname}: {comment.content}{' '}
                <Comment_likes onClick={() => handleCommentLikes('b')}>
                  b: {comment.likes}
                </Comment_likes>{' '}
                <Comment_likes onClick={() => handleCommentLikes('q')}>
                  q:{comment.dislikes}
                </Comment_likes>
              </div>
            ))}
            {/* 눈속임 댓글 */}
            {/* {addedCommnet.map((item, idx) => (
              <div key={idx}></div>
            ))} */}
          </div>
        </>
      )}
      <WriteForm>
        <WriteTextarea
          required
          value={comment}
          onChange={e => setCommnet(e.target.value)}
        ></WriteTextarea>

        <WriteButton onClick={e => handleSubmit(e)}>Add Comment</WriteButton>
      </WriteForm>
    </div>
  );
};

export default PostPage;
