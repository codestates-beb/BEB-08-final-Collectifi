import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../components/UI/Button';
import axios from 'axios';
import styled from 'styled-components';
import {data} from '../data/data';
import {WriteButton, WriteForm, WriteInput, WriteLabel, WriteTextarea} from './WritePage';

interface Post_comment {
  content: string;
  created_at: Date;
  dislikes: number;
  id: number;
  likes: number;
  post_id: number;
  user_id: number;
}

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

const PostPage = ({setCurrentPage}: {setCurrentPage: (value: number) => void}) => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<PostAttributes | null>(null);
  useEffect(() => {
    axios.get(`http://localhost:8000/community/${id}`, {withCredentials: true}).then(res => {
      setPost(res.data.data.post);
      console.log(res);
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
      });
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
            {post.Post_comments.map(comment => (
              <div key={comment.id}>{comment.content}</div>
            ))}
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
