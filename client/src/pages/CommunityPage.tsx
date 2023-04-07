import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {data} from '../data/data';

const Community = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [post, SetPost] = useState([]);
  const [postLoading, SetPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (!postLoading) {
      SetPostLoading(true);
      setTimeout(() => {
        axios
          .get('http://localhost:5500', {params: {page: page}})
          .then(response => {
            // SetPost([...post, ...response.data.data]);

            if (response.data.data.length === 0) {
              setHasMore(false);
            } else {
              setPage(page + 1);
            }
            console.log('main_get: ', response.data.data); // Do something with the response
          })
          .catch(error => {
            console.error(error);
            setHasMore(false);
          });
      }, 2000);
      SetPostLoading(false);
    }
  };

  return <div>Community</div>;
};

export default Community;
