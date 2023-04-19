import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import UserList from './UserList';
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

const Container = styled.div`
  background-color: blue;
  padding: 50px;
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Layout = styled.div`
  background-color: blue;
  padding: 50px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  background-color: brown;
  display: flex;
  width: 100%;
  font-size: 50px;
  font-weight: 600;
`;

// const Layout = styled.div`
//   background-color: aqua;
//   width: 100%;
//   display: flex;

//   height: 80vh;
// `;

const MenuBox = styled.div`
  display: flex;
  background-color: aquamarine;
  width: 300px;
  flex-direction: column;

  align-items: center;
  height: 100%;
`;

// const Menu = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   font-size: 45px;
//   font-weight: 600;
//   border: 1px solid black;
//   height: 150px;

//   :hover {
//     cursor: pointer;
//     opacity: 0.5;
//   }
// `;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  padding: 30px;
`;

const Content = styled.div`
  background-color: red;
  height: 100%;
  width: 100%;
`;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [menu, setMenu] = useState(0);
  // useEffect(() => {
  //   axios.get('http://localhost:8000/admin/users', {withCredentials: true}).then(res => {
  //     setUsers(res.data.data.users);
  //   });
  // });

  // useEffect(() => {
  //   console.log(menu);
  // }, [menu]);

  // const handleMenu = async (tab: number) => {
  //   if (tab == 1) {
  //     const response = await axios.get('http://localhost:8000/admin/posts', {
  //       withCredentials: true,
  //     });
  //     setPosts(response.data.data.posts);
  //     setMenu(tab);
  //   } else if (tab == 2) {
  //     const response = await axios.get('http://localhost:8000/admin/comments', {
  //       withCredentials: true,
  //     });
  //     setPosts(response.data.data.comments);
  //     setMenu(tab);
  //   }
  // };

  return (
    <Layout>
      <TopBar>Collectifi Admin</TopBar>
      <Container>
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
        <ContentBox></ContentBox>
      </Container>
    </Layout>

    // <Container>
    //   <Layout>
    //     <MenuBox>
    //       <Menu onClick={() => handleMenu(0)}>Users</Menu>
    //       <Menu onClick={() => handleMenu(1)}>Posts</Menu>
    //       <Menu onClick={() => handleMenu(2)}>Comments</Menu>
    //       <Menu onClick={() => handleMenu(3)}>Games</Menu>
    //     </MenuBox>
    //     <ContentBox>
    //       {menu == 0 ? <Content>{users && <UserList users={users} />}</Content> : null}
    //       {/* :
    //       menu == 1 ? <Content>{posts && <PostList posts={posts} />}</Content> :
    //       menu == 2 ? <Content>{comments && <CommentList comments={comments} />}</Content> : null
    //       } */}
    //     </ContentBox>
    //   </Layout>
    // </Container>
  );
};

export default Admin;
