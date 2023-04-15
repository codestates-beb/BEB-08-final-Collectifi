import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {motion} from 'framer-motion';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {data} from '../data/data';
import PostPage from './PostPage';
import Pagination from '../components/UI/Pagination';
import Button from '../components/UI/Button';
import BoardList from '../components/UI/BoardList';
import BoardTitleItem from '../components/UI/BoardTitleItem';
import BoardListItem from '../components/UI/BoardListItem';
// created_at 포맷 라이브러리
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Tab from '../components/UI/Tab';
import {darken, lighten} from 'polished';

TimeAgo.addDefaultLocale(en);
export interface PostsAttributes {
  id: number;
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: Date;
  views: number;
  Post_comments: object[];
  User?: User;
}
interface User {
  nickname: string;
}

const CommunityLayout = styled.div`
  max-width: 70%;
  margin: 0 auto;
  @media only screen and (max-width: 1024px) {
    max-width: 93%;
  }
`;
export const TabUl = styled.ul`
  margin-bottom: 40px;
  border-bottom: solid 1px ${props => props.theme.lineColor || 'rgb(0, 0, 0)'};
`;
export const TabLi = styled.li`
  display: inline-flex;
  margin-right: 40px;
`;
export const TabButton = styled.button<{selected: boolean}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: rgb(100, 109, 117);
  cursor: pointer;
  background: transparent;
  padding: 0px 0px 12px;

  ${props => {
    return css`
      color: ${props.color || 'rgb(0, 0, 0)'};
      &:hover {
        color: ${darken(0.2, props.color || 'rgb(0, 0, 0)')};
      }
      &:active {
        color: ${lighten(0.1, props.color || 'rgb(0, 0, 0)')};
      }
    `;
  }}

  ${props => {
    return (
      props.selected &&
      css`
        color: ${props.theme.mainColor || 'rgb(0, 0, 0)'};
        box-shadow: 0px 1px 0px 0px ${props.theme.mainColor || 'rgb(0, 0, 0)'};
      `
    );
  }}
`;
const PostButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
`;

const Community = () => {
  const navigate = useNavigate();
  const boardSize = '0.3fr 3.5fr 1fr 1fr 0.5fr 0.5fr';
  const [posts, setPosts] = useState<PostsAttributes[]>([]);
  const [popularPosts, setPopularPosts] = useState<PostsAttributes[]>([]);
  const timeAgo = new TimeAgo('en-US');

  useEffect(() => {
    // 모든 게시글을 불러옴
    axios
      .get('http://localhost:8000/community')
      .then(response => {
        setPosts(
          [...posts, ...response.data.data].map(post => {
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

    //   setPosts(
    //     data.map(post => {
    //       return {
    //         ...post,
    //         created_at: new Date(post.created_at),
    //       };
    //     }),
    //   );
    //   setPopularPosts(
    //     data
    //       .filter(item => item.likes >= 50)
    //       .map(post => {
    //         return {
    //           ...post,
    //           created_at: new Date(post.created_at),
    //         };
    //       }),
    //   );
  }, []);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // },[])
  // const fetchMoreData = () => {
  //   if (!postLoading) {
  //     SetPostLoading(true);
  //     setTimeout(() => {
  //       axios
  //         .get('http://localhost:5500', {params: {page: page}})
  //         .then(response => {
  //           // SetPost([...post, ...response.data.data]);

  //           if (response.data.data.length === 0) {
  //             setHasMore(false);
  //           } else {
  //             setPage(page + 1);
  //           }
  //           console.log('main_get: ', response.data.data); // Do something with the response
  //         })
  //         .catch(error => {
  //           console.error(error);
  //           setHasMore(false);
  //         });
  //     }, 2000);
  //     SetPostLoading(false);
  //   }
  // };

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // const [postsPerPage, setPostsPerPage] = useState(20); // 페이지당 posts 수
  const postsPerPage = 20;
  // 현재 posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
  const currentPopularPost = popularPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const [tabs, setTabs] = useState('General');
  const clickHandler = (e: string) => {
    setTabs(e);
  };

  return (
    <CommunityLayout>
      <Routes>
        <Route
          path=":id"
          element={<PostPage setCurrentPage={setCurrentPage} setPosts={setPosts} posts={posts} />}
        />
      </Routes>

      <TabUl>
        <TabLi>
          <TabButton
            onClick={() => clickHandler('General')}
            selected={tabs === 'General'}
            color={'rgb(123, 123, 123)'}
          >
            General
          </TabButton>
        </TabLi>
        <TabLi>
          <TabButton
            onClick={() => clickHandler('Popular')}
            selected={tabs === 'Popular'}
            color={'rgb(123, 123, 123)'}
          >
            Popular
          </TabButton>
        </TabLi>
      </TabUl>
      <PostButtonDiv>
        <Button onClick={() => navigate('/write')}>Post</Button>
      </PostButtonDiv>
      {/* <div>{tabs}</div> */}
      {tabs == 'General' && (
        <>
          <BoardList
            title={
              <BoardTitleItem
                title={['POST', 'TITLE', 'USER', 'DATE', 'VIEW', 'LIKES']}
                gridTemplateColumns={boardSize}
              />
            }
          >
            {currentPost &&
              currentPost.map(item => {
                // const before = new Date(new Date().getTime() - item.created_at.getTime()).getTime();
                // if (new Date().getMonth() - item.created_at.getMonth()) {
                // }
                const listItem = [
                  item.id,
                  `${item.title} [${item.Post_comments.length.toString()}]`,
                  item.User?.nickname,
                  // timeAgo.format(item.created_at),
                  // new Date().getMonth(),
                  // item.created_ats.getMonth(),
                  // (new Date() - item.created_at).toString(),
                  item.created_at.toDateString(),
                  // item.created_at.getTime(),
                  // new Date(new Date().getTime() - item.created_at.getTime()).toDateString(),
                  // before,
                  item.views,
                  item.likes,
                ];
                return (
                  <BoardListItem
                    key={item.id}
                    listItem={listItem}
                    gridTemplateColumns={boardSize}
                    linkTo={item.id.toString()}
                  />
                );
              })}
          </BoardList>
          <Pagination
            dataPerPage={postsPerPage}
            dataLength={posts.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {tabs == 'Popular' && (
        <>
          <BoardList
            title={
              <BoardTitleItem
                title={['POST', 'TITLE', 'USER', 'DATE', 'VIEW', 'LIKES']}
                gridTemplateColumns={boardSize}
              />
            }
          >
            {currentPopularPost &&
              currentPopularPost.map(item => {
                // const before = new Date(new Date().getTime() - item.created_at.getTime()).getTime();
                // if (new Date().getMonth() - item.created_at.getMonth()) {
                // }
                const listItem = [
                  item.id,
                  `${item.title} [${item.likes}]`,
                  item.user_id,
                  // timeAgo.format(item.created_at),
                  // new Date().getMonth(),
                  // item.created_ats.getMonth(),
                  // (new Date() - item.created_at).toString(),
                  item.created_at.toDateString(),
                  // item.created_at.getTime(),
                  // new Date(new Date().getTime() - item.created_at.getTime()).toDateString(),
                  // before,
                  item.views,
                  item.likes,
                ];
                return (
                  <BoardListItem
                    key={item.id}
                    listItem={listItem}
                    gridTemplateColumns={boardSize}
                    linkTo={item.id.toString()}
                  />
                );
              })}
          </BoardList>
          <Pagination
            dataPerPage={postsPerPage}
            dataLength={popularPosts.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {/* <Tab title={['General', 'Popular']}>
        
      </Tab> */}
    </CommunityLayout>
  );
};

export default Community;
