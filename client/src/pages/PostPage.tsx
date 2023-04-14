import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../components/UI/Button';
import axios from 'axios';
import styled from 'styled-components';
import {data} from '../data/data';
import {WriteButton, WriteForm, WriteInput, WriteLabel, WriteTextarea} from './WritePage';
import {PostsAttributes} from './CommunityPage';

interface PostProps {
  setCurrentPage: (value: number) => void;
  setPosts: (value: PostsAttributes[]) => void;
  posts: PostsAttributes[];
}

interface Post {
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

const PostForm = styled.form``;

const Comment_likes = styled.span``;

const PostTextarea = styled.textarea`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
  resize: none;
  height: 15vh;
`;

const PostPage = ({setCurrentPage, setPosts, posts}: PostProps) => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Post_comment[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // 포스트 디테일을 불러옴
    axios.get(`http://localhost:8000/community/${id}`, {withCredentials: true}).then(res => {
      setPost(res.data.data.post);
      setComments(res.data.data.comments);
      setIsOwner(res.data.data.isOwner);
      setLike(res.data.data.post.likes);
      setdislike(res.data.data.post.dislikes);
      setPostTitle(res.data.data.post.title);
      setPostContent(res.data.data.post.content);
      console.log('res: ', res);
    });

    // if (id) {
    //   setPost(data[parseInt(id) - 1]);
    //   setCurrentPage(Math.ceil(parseInt(id) / 20));
    // }
  }, [id]);
  // 게시글 수정 관련
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const handleEdit = () => {
    axios
      .get(`http://localhost:8000/community/${id}/edit`, {withCredentials: true})
      .then(res => {
        console.log('게시글 수정 요청: ', res);
        navigate('/edit', {state: {title: postTitle, content: postContent, id: id}});
      })
      .catch(err => console.log('게시글 수정 err: ', err));
  };
  // 게시글 삭제 관련
  const handleDelete = () => {
    console.log('글을 삭제하시겠습니까?');
    axios
      .delete(`http://localhost:8000/community/${id}/delete`, {withCredentials: true})
      .then(res => {
        console.log('글삭제 요청 결과2: ', res);
        // 글삭제 성공시 글목록 다시 불러오기
        axios
          .get('http://localhost:8000/community')
          .then(response => {
            setPosts(
              [...response.data.data].map(post => {
                return {
                  ...post,
                  created_at: new Date(post.created_at),
                };
              }),
            );
          })
          .catch(error => {
            console.error(error);
          });

        alert('글을 삭제하였습니다.');
        navigate('/community', {replace: true});
      })
      .catch(err => {
        console.log('글삭제 실패', err);
      });
  };

  // 좋아요 관련
  const [like, setLike] = useState(0);
  const [dislike, setdislike] = useState(0);
  const handleLikes = (data: string) => {
    axios
      .post(`http://localhost:8000/community/${id}/like`, {data}, {withCredentials: true})
      .then(res => {
        //ToDo 토스트메세지: 좋아요 or 싫어요
        console.log('좋아요: ', res);
        if (data == 'likes') {
          setLike(prev => prev + 1);
        } else if (data == 'dislikes') {
          setdislike(prev => prev + 1);
        }
      })
      .catch(err => {
        console.log('좋아요를 이미 눌렀습니다');
        alert('Recommendations are only available once a day.');
      });
  };

  // 댓글 기능 관련
  const [comment, setCommnet] = useState('');
  //ToDo 최소 글자 수 제한
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
      })
      .catch(err => {
        console.log('error: ', err);
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
            {isOwner && (
              <>
                {' '}
                <WriteButton onClick={() => handleEdit()}>Edit</WriteButton>{' '}
                <WriteButton onClick={handleDelete}>Delete</WriteButton>
              </>
            )}
          </div>
          <span>제목: {postTitle}</span> <span>조회수: {post.views}</span>
          <div>내용: {postContent}</div>
          <div>
            {like}
            <WriteButton onClick={() => handleLikes('likes')}>Likes</WriteButton>
            <WriteButton onClick={() => handleLikes('dislikes')}>DisLikes</WriteButton>
            {dislike}
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
          </div>
        </>
      )}
      {/* 댓글 작성 태그 */}
      <PostForm>
        <PostTextarea
          required
          value={comment}
          onChange={e => setCommnet(e.target.value)}
        ></PostTextarea>

        <WriteButton onClick={e => handleSubmit(e)}>Add Comment</WriteButton>
      </PostForm>
    </div>
  );
};

export default PostPage;
