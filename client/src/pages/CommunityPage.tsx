import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {data} from '../data/data';
import PostPage from './PostPage';
import Pagination from '../components/UI/Pagination';

interface PostAttributes {
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: Date;
  views: number;
}
const Community = () => {
  const navigate = useNavigate();
  // const [page, setPage] = useState(1);
  const [post, setPost] = useState<PostAttributes[]>([]);
  // const [postLoading, setPostLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  // 게시글 100개를 불러 옵니다.
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
    setPost(
      data.slice(0, 20).map(post => {
        return {
          ...post,
          created_at: new Date(post.created_at),
        };
      }),
    );
  }, []);

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
    navigate(`/community/${id}`);
    window.scrollTo(0, 0);
  };

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(20); // 페이지당 posts 수
  // 현재 posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = post.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Routes>
        <Route path=":id" element={<PostPage />} />
      </Routes>
      {currentPost &&
        currentPost.map((item, idx) => (
          <div key={item.user_id} onClick={() => handleClick(idx + 1)}>
            {idx + 1}번{item.user_id}
            {item.title}
          </div>
        ))}
      <Pagination
        dataPerPage={postsPerPage}
        dataLength={post.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Community;
