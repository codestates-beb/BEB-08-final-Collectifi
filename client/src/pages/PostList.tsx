import React from 'react';
import styled from 'styled-components';

type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  views: number;
};

type PostListProps = {
  posts: Post[];
};

const Table = styled.table`
  font-size: 25px;
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const PostList: React.FC<PostListProps> = ({posts}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Content</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Created_at</th>
          <th>Views</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.content.substr(0, 10)}</td>
            <td>{post.likes}</td>
            <td>{post.dislikes}</td>
            <td>{post.created_at}</td>
            <td>{post.views}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostList;
