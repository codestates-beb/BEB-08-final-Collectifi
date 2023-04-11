import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
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
TimeAgo.addDefaultLocale(en);
interface PostsAttributes {
  id: number;
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: Date;
  views: number;
}
const CommunityLayout = styled.div`
  max-width: 60%;
  margin: 0 auto;
  @media only screen and (max-width: 1024px) {
    max-width: 93%;
  }
`;

const Community = () => {
  const navigate = useNavigate();
  // const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostsAttributes[]>([]);
  const timeAgo = new TimeAgo('en-US');
  // const [postLoading, setPostLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // axios
    // .get('http://localhost:5500', {params: {page: page}})
    // .then(response => {
    //   setPost([...post, ...response.data.data]);
    //   setPage(page + 1);
    //   console.log('main_get: ', response.data.data); // Do something with the response
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    // setCurrentPage()
    setPosts(
      data.map(post => {
        return {
          ...post,
          created_at: new Date(post.created_at),
        };
      }),
    );
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
  const handleClick = (id: number) => {
    // navigate(`/community/${id}`);
    window.scrollTo(0, 0);
  };

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // const [postsPerPage, setPostsPerPage] = useState(20); // 페이지당 posts 수
  const postsPerPage = 20;
  // 현재 posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <CommunityLayout>
      <Routes>
        <Route path=":id" element={<PostPage setCurrentPage={setCurrentPage} />} />
      </Routes>
      <Button onClick={() => navigate('/write')}>글 작성</Button>
      {/* {currentPost &&  
        currentPost.map(item => (
          <div key={item.id} onClick={() => handleClick(item.id)}>
            <div>{item.id}번</div>

            {`${item.title}                   ${item.user_id}`}
          </div>
        ))} */}
      <BoardList
        title={
          <BoardTitleItem
            title={['POST', 'TITLE', 'USER', 'DATE']}
            gridTemplateColumns="1fr 3fr 1fr 1fr"
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
              `${item.title} [${item.views}]`,
              item.user_id,
              // timeAgo.format(item.created_at),
              // new Date().getMonth(),
              // item.created_ats.getMonth(),
              // (new Date() - item.created_at).toString(),
              item.created_at.toDateString(),
              // item.created_at.getTime(),
              // new Date(new Date().getTime() - item.created_at.getTime()).toDateString(),
              // before,
            ];
            return (
              <BoardListItem
                key={item.id}
                listItem={listItem}
                gridTemplateColumns="1fr 3fr 1fr 1fr"
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
    </CommunityLayout>
  );
};

export default Community;
