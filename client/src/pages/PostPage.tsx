import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../components/UI/Button';
import axios from 'axios';
import styled from 'styled-components';
import {data} from '../data/data';

interface PostAttributes {
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  views: number;
}

const PostPage = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<PostAttributes | null>(null);
  useEffect(() => {
    if (id) {
      setPost(data[parseInt(id) - 1]);
    }
  }, [id]);
  return (
    <div>
      {post && (
        <>
          <div>번호: {id}</div>
          <div>작성자: {post.user_id}</div>
          <div>날짜: {post.created_at}</div>
          <span>제목: {post.title}</span> <span>조회수: {post.views}</span>
          <div>내용: {post.content}</div>
          <div>
            {post.likes}
            <span>좋아요</span> <span>싫어요</span>
            {post.dislikes}
          </div>
          <Button onClick={() => navigate('/community')}>목록</Button>
        </>
      )}
    </div>
  );
};

export default PostPage;
