import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '../components/UI/Button';
import axios from 'axios';
import styled from 'styled-components';
import {data} from '../data/data';
import {WriteButton, WriteForm, WriteInput, WriteLabel, WriteTextarea} from './WritePage';
import {PostsAttributes} from './CommunityPage';
import {faThumbsUp, faThumbsDown, faEdit} from '@fortawesome/free-regular-svg-icons';
import {faCrown, faTrash, faCheck, faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {toast} from 'react-toastify';
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
  User?: User;
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
  Post_comment_likeds: Post_comment_likeds[];
}
interface Post_comment_likeds {
  user_id?: number;
}

const PostLayout = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  width: 100%;
  margin-top: 5px;
  border-top: 1px solid #d4d4d4;
  border-bottom: 1px solid #d4d4d4;
  align-self: flex-start;
  font-size: 18px;
  font-weight: 600;
  padding: 15px;
`;
const WriterDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d4d4d4;
  padding: 4px;
  margin-bottom: 15px;
`;
const WriteContent = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  line-height: 1.2;
`;
const Writer = styled.span`
  padding: 10px;
`;
const DateS = styled.span`
  display: flex;
  padding: 10px;
  gap: 30px;
`;
const PostForm = styled.form`
  width: 100%;
`;
const PostLikeDiv = styled.div`
  margin-bottom: 12px;
`;
const LikeCount = styled.span`
  color: ${props => props.theme.mainColor};
  margin-right: 5px;
`;
const DisLikeCount = styled.span`
  margin-left: 5px;
`;

const IsOwner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 10px;
`;
const OwnersBtn = styled.div`
  /* background: #f1356d; */
  color: black;
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid #cacaca;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  margin-right: 7px;
  margin-left: 7px;
`;

// 댓글 컴포넌트
const CommentContainer = styled.div`
  width: 100%;
  /* background: #dcdcdc; */
  padding: 10px;
`;
const Comment = styled.div`
  padding: 7px;
  /* height: 200px; */
  margin: 10px 10px 10px 10px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  /* background: green; */
`;
const CommentUser = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  margin: 5px;
`;

const CrownIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  color: #e9e900;
`;
const EditButton = styled(FontAwesomeIcon)`
  margin-right: 7px;
  cursor: pointer;
`;
const DeleteButton = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
`;
const CheckButton = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
`;
const CloseButton = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
`;

const Cancel = styled.span`
  margin-right: 7px;
  cursor: pointer;

  color: black;
  white-space: nowrap;
  padding: 5px 15px;
  border-radius: 12px;
  border: 1px solid #cacaca;
  font-size: 12px;
  font-weight: bold;
`;
const Save = styled.span`
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
  color: black;
  white-space: nowrap;
  padding: 5px 15px;
  border-radius: 12px;
  border: 1px solid #cacaca;
  font-size: 12px;
  font-weight: bold;
`;

const CommentContent = styled.div`
  padding: 5px;
  margin: 5px;
`;
const CommentInput = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 8px 14px 10px;
  /* resize: none; */
  border: 1px solid ${props => props.theme.lineColor};
  &:focus-visible {
    background-color: #fff;
    border: 1px solid grey;
  }
`;

const LieksContainer = styled.div`
  /* background: green; */
  text-align: end;
  margin-right: 30px;
  margin: 5px;
  padding: 5px;
`;
const Comment_likes = styled.span`
  margin-right: 5px;
`;

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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Thumbs = styled.span`
  cursor: pointer;
  margin-right: 5px;
`;
const PostPage = ({setCurrentPage, setPosts, posts}: PostProps) => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Post_comment[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [userId, setUserId] = useState(0);

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
      setUserId(res.data.data.userId);
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
    if (!confirm('Are you sure you want to delete the post?')) return;
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
            console.error('글 불러오기 실패: ', error);
          });

        // alert('글을 삭제하였습니다.');
        toast.info('Deleted post successfully.');

        navigate('/community', {replace: true});
      })
      .catch(err => {
        console.log('글삭제 실패', err);
      });
  };

  // 게시글 좋아요 관련
  const [like, setLike] = useState(0);
  const [dislike, setdislike] = useState(0);
  const handleLikes = (data: string) => {
    axios
      .post(`http://localhost:8000/community/${id}/like`, {data}, {withCredentials: true})
      .then(res => {
        console.log('좋아요: ', res);
        if (data == 'likes') {
          setLike(prev => prev + 1);
          toast.info('Like it!');
        } else if (data == 'dislikes') {
          setdislike(prev => prev + 1);
          toast.info('Dislike it!');
        }
      })
      .catch(err => {
        console.log('좋아요를 이미 눌렀습니다', err);
        // alert('Recommendations are only available once a day.');
        toast.error(err.response.data.error);
      });
  };

  // 댓글 기능 관련
  const [comment, setCommnet] = useState('');
  const [isInput, setIsInput] = useState('');
  const [editContent, setEditContent] = useState('');
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
        toast.success('finished writing comments!');
        console.log('new comments: ', res.data.data.result);
      })
      .catch(err => {
        console.log('error: ', err);
        toast.error('Failed to write: ', err);
      });
  };

  // 댓글 좋아요 기능 관련
  const handleCommentLikes = (e: number, like: string) => {
    console.log('라이크: ', like);
    axios // localhost:8000/community/2/comment/3/like
      .post(
        `http://localhost:8000/community/${id}/comment/${e}/like`,
        {data: like},
        {withCredentials: true},
      )
      .then(res => {
        console.log('좋아요: ', res);
        if (res.data.data.data == 'likes') {
          console.log('set likes: ', res.data.data.data);
          setLike(prev => prev + 1);
          toast.info('Like it!');
        } else if (res.data.data.data == 'dislikes') {
          setdislike(prev => prev + 1);
          console.log('set dislikes: ', res.data.data.data);
          toast.info('Disike it!');
        } else {
          // alert('Recommendations are only available once a day.');
          console.log(res.data.data.data);
          toast.warning('Recommendations are only available once a day.');
        }
      })
      .catch(err => {
        console.log('좋아요를 이미 눌렀습니다', err.response.data.message);
        // alert('Recommendations are only available once a day. ' + err);
        toast.error(err.response.data.message);
      });
  };
  const editComment = (e: number) => {
    axios
      .get(`http://localhost:8000/community/${id}/comment/${e}/edit`, {withCredentials: true})
      .then(res => {
        console.log('댓글 수정 요청: ', res);
        console.log(res.data.data);
        // Input 태그로 바꿔줌
        setIsInput(e.toString());
        // 태그 안에 내용을 입력해줌
        setEditContent(res.data.data);
      })
      .catch(err => {
        console.log('게시글 수정 err: ', err);
        toast.error('Failed to edit comment');
      });
  };
  const deleteComment = (e: number) => {
    console.log('댓글을 삭제하시겠습니까?');
    if (!confirm('Are you sure you want to delete the comment?')) return;
    axios
      .delete(`http://localhost:8000/community/${id}/comment/${e}`, {withCredentials: true})
      .then(res => {
        console.log('댓글삭제 요청 결과: ', res);
        toast.info('Deleted comment successfully.');
        // 프론트 변경
        setComments(prev => prev.filter(comment => comment.id !== e));
      })
      .catch(err => {
        console.log('글삭제 실패', err);
        toast.error('Error deleting comment');
      });
  };
  const editCommentCancel = () => {
    setIsInput('');
    setEditContent('');
  };
  const editCommentSave = (e: number) => {
    axios
      .patch(
        `http://localhost:8000/community/${id}/comment/${e}/edit`,
        {content: editContent},
        {withCredentials: true},
      )
      .then(res => {
        console.log('댓글 수정patch: ', res);
        toast.success('Editted it successfully! 🎈');
        // 프론트 변경
        setComments(prev =>
          prev.map(comment => {
            return comment.id == e
              ? {
                  ...comment,
                  content: editContent,
                }
              : comment;
          }),
        );

        setIsInput('');
        setEditContent('');
      })
      .catch(err => {
        console.log('댓글 수정 err: ', err);
        toast.error('Failed to edit comment');
      });
  };

  return (
    <PostLayout>
      {post && (
        <>
          <Title>{postTitle}</Title>

          <WriterDate>
            <Writer>Writer: {post.User?.nickname}</Writer>
            <DateS>
              <div>View: {post.views}</div>
              <div> {post.created_at.split('T')[0]}</div>
            </DateS>
          </WriterDate>
          <WriteContent>{postContent}</WriteContent>
          <PostLikeDiv>
            <LikeCount>{like}</LikeCount>
            <WriteButton onClick={() => handleLikes('likes')}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </WriteButton>
            <WriteButton onClick={() => handleLikes('dislikes')}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </WriteButton>
            <DisLikeCount>{dislike}</DisLikeCount>
          </PostLikeDiv>
          {/* <Button onClick={() => navigate('/community')}>목록</Button> */}

          {isOwner && (
            <IsOwner>
              <OwnersBtn onClick={handleEdit}>Edit</OwnersBtn>
              <OwnersBtn onClick={handleDelete}>Delete</OwnersBtn>
            </IsOwner>
          )}

          <CommentContainer>
            {/* 댓글 뿌려주는 부분 */}
            {comments?.map(comment => (
              <Comment key={comment.id}>
                <CommentUser>
                  <div>
                    {comment.User.nickname}
                    <CrownIcon icon={faCrown} />
                  </div>

                  {/* 댓쓴이와  로그인 계정이 동일한가? */}
                  {comment.Post_comment_likeds[0]?.user_id == userId ? (
                    <>
                      {/* 수정 버튼을 눌렀는가? */}
                      {parseInt(isInput) !== comment.id ? (
                        <div>
                          <EditButton onClick={() => editComment(comment.id)} icon={faEdit} />
                          <DeleteButton onClick={() => deleteComment(comment.id)} icon={faTrash} />
                        </div>
                      ) : (
                        <div>
                          <CloseButton onClick={editCommentCancel} icon={faClose} />
                          <CheckButton onClick={() => editCommentSave(comment.id)} icon={faCheck} />
                          {/* <Cancel onClick={editCommentCancel}>Cancel</Cancel>
                        <Save onClick={editCommentSave}>Save</Save> */}
                        </div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                </CommentUser>
                {parseInt(isInput) == comment.id ? (
                  <CommentInput
                    minLength={5}
                    maxLength={2500}
                    required
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={8}
                  />
                ) : (
                  <CommentContent>{comment.content}</CommentContent>
                )}

                <LieksContainer>
                  {parseInt(isInput) !== comment.id ? (
                    <>
                      {' '}
                      <Comment_likes onClick={() => handleCommentLikes(comment.id, 'likes')}>
                        <Thumbs>
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </Thumbs>
                        {comment.likes}
                      </Comment_likes>
                      <Comment_likes onClick={() => handleCommentLikes(comment.id, 'dislikes')}>
                        <Thumbs>
                          <FontAwesomeIcon icon={faThumbsDown} />
                        </Thumbs>
                        {comment.dislikes}
                      </Comment_likes>{' '}
                    </>
                  ) : (
                    <div></div>
                  )}
                </LieksContainer>
              </Comment>
            ))}
          </CommentContainer>
        </>
      )}

      {/* 댓글 작성 태그 */}
      <PostForm>
        <PostTextarea
          minLength={5}
          maxLength={1000}
          required
          value={comment}
          onChange={e => setCommnet(e.target.value)}
        ></PostTextarea>
        <ButtonContainer>
          <WriteButton onClick={e => handleSubmit(e)}>Add Comment</WriteButton>
        </ButtonContainer>
      </PostForm>
    </PostLayout>
  );
};

export default PostPage;
