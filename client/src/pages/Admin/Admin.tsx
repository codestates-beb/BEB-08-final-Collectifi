import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Sidebar, Menu, MenuItem, SubMenu, MenuItemProps} from 'react-pro-sidebar';
import ReactPaginate from 'react-js-pagination';
import {faUser, faComment, faEdit, faMessage, faListAlt} from '@fortawesome/free-regular-svg-icons';
import {faList, faTrash, faBan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import BoardList from '../../components/UI/BoardList';
import BoardTitleItem from '../../components/UI/BoardTitleItem';
import BoardListItem from '../../components/UI/BoardListItem';
import Pagination from '../../components/UI/Pagination';
import {toast} from 'react-toastify';
interface MenuItemSProps {
  active: boolean;
}
interface IUsers {
  address: string;
  id: number;
  nickname: string;
  rank: number;
  referral?: string;
  token_amount: number;
}
interface IPosts {
  content: string;
  created_at: Date;
  dislikes: number;
  id: number;
  likes: number;
  title: string;
  user_id: number;
  views: number;
}
interface IComments {
  content: string;
  created_at: Date;
  dislikes: number;
  id: number;
  likes: number;
  post_id: number;
  user_id: number;
}
interface IBans {
  id: number;
  address: string;
  created_at: Date;
}
interface IWins {
  winDiainage: number;
  loseDiainage: number;
  drawDiainage: number;
  winToken: number;
  loseToken: number;
  drawToken: number;
  totalToken: number;
}
const Container = styled.div`
  /* background-color: grey; */
  padding: 50px;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Layout = styled.div`
  /* background-color: #4343f4; */
  padding: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  /* background-color: brown; */
  display: flex;
  width: 100%;
  font-size: 50px;
  font-weight: 600;
`;

const MenuBox = styled.div`
  display: flex;
  background-color: aquamarine;
  width: 300px;
  flex-direction: column;

  align-items: center;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  width: 100%;
  height: 100%;
  /* background: green; */
`;

const Content = styled.div`
  background-color: red;
  height: 100%;
  width: 100%;
`;

const MenuItemS = styled(MenuItem)<MenuItemSProps>`
  background: ${props => (props.active ? '#bdbdbd' : 'white')};
`;
const PostDetail = styled.div<{active: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px 5px 10px;
  padding: 25px 30px 30px 40px;
  display: ${props => (props.active ? '' : 'none')};
`;
const TrashIcon = styled(FontAwesomeIcon)`
  margin: 15px;
  margin-right: 50px;
  padding: 20px;
  cursor: pointer;
`;
const CommentDetail = styled.div<{active: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px 5px 10px;
  padding: 25px 30px 30px 40px;
  display: ${props => (props.active ? '' : 'none')};
`;
const WinDetail = styled.div<{active: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px 5px 10px;
  padding: 25px 30px 30px 40px;
  display: ${props => (props.active ? '' : 'none')};
`;
const BanIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const BoardListAdmin = styled(BoardList)`
  width: 100%;
  height: 100%;
  /* background-color: brown; */
`;

const BoardListItemAdmin = styled(BoardListItem)`
  width: 100%;
  height: 100%;
  /* background-color: yellow; */
`;

const Admin = () => {
  // 공통
  const [menu, setMenu] = useState(0);
  const boardSize = '0.3fr 3fr 1fr 1fr 0.5fr 0.5fr';

  // Users
  const [users, setUsers] = useState<IUsers[]>([]);
  const [usersLength, setUsersLength] = useState(users.length);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUsers = userCurrentPage * usersPerPage;
  const indexOfFirstUsers = indexOfLastUsers - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUsers, indexOfLastUsers);
  const userPaginate = (pageNumber: number) => {
    setUserCurrentPage(pageNumber);
  };
  // Posts
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [postsLength, setPostsLength] = useState(posts.length);
  const [postCurrentPage, setPostCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPosts = postCurrentPage * postsPerPage;
  const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPosts, indexOfLastPosts);
  const postPaginate = (pageNumber: number) => {
    setPostCurrentPage(pageNumber);
  };
  const [activePost, setActivePost] = useState(0);
  const showPostDetail = (id: number) => {
    if (activePost !== id) {
      console.log('post id: ', id);
      setActivePost(id);
    } else {
      setActivePost(0);
    }
  };

  // Comments
  const [comments, setComments] = useState<IComments[]>([]);
  const [commentsLength, setCommentsLength] = useState(comments.length);
  const [commentCurrentPage, setCommentCurrentPage] = useState(1);
  const commentsPerPage = 20;
  const indexOfLastComments = commentCurrentPage * commentsPerPage;
  const indexOfFirstComments = indexOfLastComments - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComments, indexOfLastComments);
  const commentPaginate = (pageNumber: number) => {
    setCommentCurrentPage(pageNumber);
  };
  const [activeComment, setActiveComment] = useState(0);
  const showCommentDetail = (id: number) => {
    if (activeComment !== id) {
      console.log('post id: ', id);
      setActiveComment(id);
    } else {
      setActiveComment(0);
    }
  };

  // Bans
  const [bans, setBans] = useState<IBans[]>([]);
  const [bansLength, setBansLength] = useState(bans.length);
  const [banCurrentPage, setBanCurrentPage] = useState(1);
  const bansPerPage = 10;
  const indexOfLastBans = banCurrentPage * bansPerPage;
  const indexOfFirstBans = indexOfLastBans - bansPerPage;
  let currentBans = bans.slice(indexOfFirstBans, indexOfLastBans);
  const banPaginate = (pageNumber: number) => {
    setBanCurrentPage(pageNumber);
  };

  // Win
  const [wins, setWins] = useState<IWins[]>([]);
  const [winsLength, setWinsLength] = useState(wins.length);
  const [winCurrentPage, setWinCurrentPage] = useState(1);
  const winsPerPage = 10;
  const indexOfLastWins = winCurrentPage * winsPerPage;
  const indexOfFirstWins = indexOfLastWins - winsPerPage;
  const currentWins = wins.slice(indexOfFirstWins, indexOfLastWins);
  const winPaginate = (pageNumber: number) => {
    setWinCurrentPage(pageNumber);
  };
  const [activeWin, setActiveWin] = useState(0);
  const showWinDetail = (idx: number) => {
    if (activeWin !== idx) {
      console.log('win id: ', idx);
      setActiveWin(idx);
    } else {
      setActiveWin(0);
    }
  };

  useEffect(() => {
    if (menu === 0) {
      if (users.length === 0) {
        axios.get('http://localhost:8000/admin/users', {withCredentials: true}).then(res => {
          setUsers(res.data.data.users);
          setUsersLength(res.data.data.users.length);
          setUserCurrentPage(1);
          console.log('유저: ', res.data.data.users);
        });
      } else {
        console.log('이미 users 데이터가 존재');
      }
    } else if (menu === 1) {
      if (posts.length === 0) {
        axios.get('http://localhost:8000/admin/posts', {withCredentials: true}).then(res => {
          // setPosts(res.data.data.posts);
          setPosts(
            [...res.data.data.posts].map(post => {
              return {
                ...post,
                created_at: new Date(post.created_at),
              };
            }),
          );
          setPostsLength(res.data.data.posts.length);
          setPostCurrentPage(1);
          console.log('포스트: ', res.data.data.posts);
        });
      } else {
        console.log('이미 posts 데이터가 존재');
      }
    } else if (menu === 2) {
      if (comments.length === 0) {
        axios.get('http://localhost:8000/admin/comments', {withCredentials: true}).then(res => {
          setComments(res.data.data.comments);
          setCommentsLength(res.data.data.comments.length);
          setCommentCurrentPage(1);
          console.log('댓글: ', res.data.data.comments);
        });
      } else {
        console.log('이미 comments 데이터가 존재');
      }
    } else if (menu === 3) {
      if (bans.length === 0) {
        axios.get('http://localhost:8000/admin/blacklists', {withCredentials: true}).then(res => {
          setBans(
            [...res.data.data.blacklists].map(black => {
              return {
                ...black,
                created_at: new Date(black.created_at),
              };
            }),
          );
          setBansLength(res.data.data.blacklists.length);
          setBanCurrentPage(1);
          console.log('블랙리스트: ', res.data.data.blacklists);
        });
      } else {
        console.log('이미 blacklists 데이터가 존재');
      }
    } else if (menu === 4) {
      if (wins.length === 0) {
        axios.get('http://localhost:8000/admin/win', {withCredentials: true}).then(res => {
          setWins(res.data.data);
          // setWins(
          //   [...res.data.data.blacklists].map(black => {
          //     return {
          //       ...black,
          //       created_at: new Date(black.created_at),
          //     };
          //   }),
          // );
          setWinsLength(res.data.data.length);
          setWinCurrentPage(1);
          console.log('Win: ', res.data.data);
        });
      } else {
        console.log('이미 wins 데이터가 존재');
      }
    }
  }, [menu]);

  // 유저 블랙
  const banUser = (address: string) => {
    if (confirm('Are you sure you want to ban?')) {
      axios
        .post('http://localhost:8000/admin/user', {address}, {withCredentials: true})
        .then(res => {
          toast.success('Banned user successfully');

          setBans(prev => [...prev, res.data.message]);
          console.log('Banned user successfully', res.data.message);
        })
        .catch(error => {
          toast.error('Failed to ban user', error);
        });
    }
  };

  const unbanUser = (address: string) => {
    if (confirm('Are you sure you want to unban?')) {
      axios
        .delete('http://localhost:8000/admin/blacklist', {data: {address}, withCredentials: true})
        .then(res => {
          toast.success('Unbanned user successfully');

          setBans(prev => [...prev].filter(a => a.address !== address));
          console.log('Unbanned user successfully', res.data.message);
        })
        .catch(error => {
          toast.error('Failed to unban user', error);
        });
    }
  };

  useEffect(() => {
    currentBans = bans.slice(indexOfFirstBans, indexOfLastBans);
  }, [bans]);

  const deletePost = (id: number) => {
    if (confirm('Are you sure you want to delete post?')) {
      axios
        .delete('http://localhost:8000/admin/post', {data: {id}, withCredentials: true})
        .then(res => {
          toast.success('Deleted post successfully');

          setPosts(prev => [...prev].filter(a => a.id !== id));
          setComments(prev => [...prev.filter(a => a.post_id !== id)]);
          console.log('Deleted post successfully', res.data.message);
        })
        .catch(error => {
          toast.error('Failed to delete post', error);
        });
    }
  };
  const deleteComment = (id: number) => {
    if (confirm('Are you sure you want to delete comment?')) {
      axios
        .delete('http://localhost:8000/admin/comment', {data: {id}, withCredentials: true})
        .then(res => {
          toast.success('Deleted comment successfully');

          setComments(prev => [...prev].filter(a => a.id !== id));
          console.log('Deleted comment successfully', res.data.message);
        })
        .catch(error => {
          toast.error('Failed to delete comment', error);
        });
    }
  };

  return (
    <Layout>
      <TopBar>Collectifi Admin</TopBar>
      <Container>
        <Sidebar style={{fontSize: 25, fontWeight: 600}}>
          <Menu>
            <SubMenu label="Database">
              <MenuItemS active={menu === 0} onClick={() => setMenu(0)}>
                <FontAwesomeIcon icon={faUser} style={{marginRight: 10}} />
                Users
              </MenuItemS>
              <MenuItemS active={menu === 1} onClick={() => setMenu(1)}>
                <FontAwesomeIcon icon={faList} style={{marginRight: 10}} />
                Posts
              </MenuItemS>
              <MenuItemS active={menu === 2} onClick={() => setMenu(2)}>
                <FontAwesomeIcon icon={faMessage} style={{marginRight: 10}} />
                Comments
              </MenuItemS>
              <MenuItemS active={menu === 3} onClick={() => setMenu(3)}>
                <FontAwesomeIcon icon={faBan} style={{marginRight: 10}} />
                BlackLists
              </MenuItemS>
            </SubMenu>
            <MenuItemS active={menu === 4} onClick={() => setMenu(4)}>
              Win
            </MenuItemS>
          </Menu>
        </Sidebar>

        {menu === 0 && (
          <ContentBox>
            <BoardListAdmin
              title={
                <BoardTitleItem
                  title={[
                    'ID',
                    'NICKNAME',
                    'ADDRESS',
                    'RANK',
                    'REFERRAL',
                    'TOKEN_AMOUNT',
                    'BAN_USER',
                  ]}
                  gridTemplateColumns={'0.3fr 1fr 1fr 1fr 1fr 1fr 0.5fr'}
                />
              }
            >
              {currentUsers &&
                currentUsers.map(user => {
                  const listItemU = [
                    user.id,
                    user.nickname,
                    user.address,
                    user.rank,
                    user.referral || 'None',
                    user.token_amount,
                    <BanIcon onClick={() => banUser(user.address)} key={user.id} icon={faBan} />,
                  ];
                  return (
                    <BoardListItemAdmin
                      key={user.id}
                      listItem={listItemU}
                      gridTemplateColumns={'0.3fr 1fr 1fr 1fr 1fr 1fr 0.5fr'}
                      linkTo={''}
                      onClick={() => banUser(user.address)}
                    />
                  );
                })}
            </BoardListAdmin>
            <Pagination
              dataPerPage={usersPerPage}
              dataLength={usersLength}
              paginate={userPaginate}
              currentPage={userCurrentPage}
              setCurrentPage={setUserCurrentPage}
            />
          </ContentBox>
        )}

        {menu === 1 && (
          <ContentBox>
            <BoardListAdmin
              title={
                <BoardTitleItem
                  title={['ID', 'TITLE', 'USER', 'DATE', 'VIEW', 'LIKES/DISLIKES']}
                  gridTemplateColumns={boardSize}
                />
              }
            >
              {currentPosts &&
                currentPosts.map(post => {
                  const listItemP = [
                    post.id,
                    post.title,
                    post.user_id,
                    post.created_at.toString(),
                    post.views,
                    `${post.likes} / ${post.dislikes}`,
                    // <FontAwesomeIcon key={post.id} icon={faTrash} />,
                  ];
                  return (
                    <>
                      <BoardListItemAdmin
                        key={post.id}
                        listItem={listItemP}
                        gridTemplateColumns={boardSize}
                        linkTo={''}
                        onClick={() => showPostDetail(post.id)}
                      />
                      <PostDetail active={activePost === post.id}>
                        <div>{post.content}</div>
                        <TrashIcon
                          onClick={() => deletePost(post.id)}
                          key={post.id}
                          icon={faTrash}
                        />
                      </PostDetail>
                    </>
                  );
                })}
            </BoardListAdmin>
            <Pagination
              dataPerPage={postsPerPage}
              dataLength={postsLength}
              paginate={postPaginate}
              currentPage={postCurrentPage}
              setCurrentPage={setPostCurrentPage}
            />
          </ContentBox>
        )}
        {menu === 2 && (
          <ContentBox>
            <BoardListAdmin
              title={
                <BoardTitleItem
                  title={['ID', 'CONTENT', 'POST_ID', 'USER_ID', 'DATE', 'LIKES/DISLIKES']}
                  gridTemplateColumns={boardSize}
                />
              }
            >
              {currentComments &&
                currentComments.map(comment => {
                  const listItemC = [
                    comment.id,
                    comment.content,
                    comment.post_id,
                    comment.user_id,
                    comment.created_at.toString(),
                    `${comment.likes} / ${comment.dislikes}`,
                    // <FontAwesomeIcon key={comment.id} icon={faTrash} />,
                  ];
                  return (
                    <>
                      <BoardListItemAdmin
                        key={comment.id}
                        listItem={listItemC}
                        gridTemplateColumns={boardSize}
                        linkTo={''}
                        onClick={() => showCommentDetail(comment.id)}
                      />
                      <CommentDetail active={activeComment === comment.id}>
                        <div>{comment.content}</div>
                        <TrashIcon
                          onClick={() => deleteComment(comment.id)}
                          key={comment.id}
                          icon={faTrash}
                        />
                      </CommentDetail>
                    </>
                  );
                })}
            </BoardListAdmin>
            <Pagination
              dataPerPage={commentsPerPage}
              dataLength={commentsLength}
              paginate={commentPaginate}
              currentPage={commentCurrentPage}
              setCurrentPage={setCommentCurrentPage}
            />
          </ContentBox>
        )}

        {menu === 3 && (
          <ContentBox>
            <BoardListAdmin
              title={
                <BoardTitleItem
                  title={['ID', 'ADDRESS', 'DATE']}
                  gridTemplateColumns={'0.5fr 0.5fr 1fr 0.5fr'}
                />
              }
            >
              {currentBans &&
                currentBans.map(ban => {
                  const listItemB = [
                    ban.id,
                    ban.address,
                    ban.created_at.toString(),
                    <FontAwesomeIcon
                      onClick={() => banUser(ban.address)}
                      key={ban.id}
                      icon={faBan}
                    />,
                  ];
                  return (
                    <BoardListItemAdmin
                      key={ban.id}
                      listItem={listItemB}
                      gridTemplateColumns={'0.5fr 0.5fr 1fr 0.5fr'}
                      linkTo={''}
                      onClick={() => unbanUser(ban.address)}
                    />
                  );
                })}
            </BoardListAdmin>
            <Pagination
              dataPerPage={bansPerPage}
              dataLength={bansLength}
              paginate={banPaginate}
              currentPage={banCurrentPage}
              setCurrentPage={setBanCurrentPage}
            />
          </ContentBox>
        )}

        {menu === 4 && (
          <ContentBox>
            <BoardListAdmin
              title={
                <BoardTitleItem
                  title={[
                    'GAME',
                    'TOTAL TOKEN',
                    'WIN',
                    'DRAW',
                    'LOSE',
                    'WIN DRAIN',
                    'DRAW DRAIN',
                    'LOSE DRAIN',
                    'STATUS',
                  ]}
                  gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}
                />
              }
            >
              {currentWins &&
                currentWins.map((win, idx) => {
                  const listItemW = [
                    'TOT vs MCU',
                    win.totalToken,
                    win.winToken,
                    win.drawToken,
                    win.loseToken,
                    win.winDiainage,
                    win.drawDiainage,
                    win.loseDiainage,
                    'End',
                  ];
                  return (
                    <>
                      <BoardListItemAdmin
                        key={idx}
                        listItem={listItemW}
                        gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}
                        linkTo={''}
                        onClick={() => showWinDetail(idx)}
                      />
                      <WinDetail active={activeWin === idx}>
                        <div>WIN</div>
                        <div>DRAW</div>
                        <div>LOSE</div>
                      </WinDetail>
                    </>
                  );
                })}
            </BoardListAdmin>
            <Pagination
              dataPerPage={winsPerPage}
              dataLength={winsLength}
              paginate={winPaginate}
              currentPage={winCurrentPage}
              setCurrentPage={setWinCurrentPage}
            />
          </ContentBox>
        )}
      </Container>
    </Layout>
  );
};

export default Admin;
