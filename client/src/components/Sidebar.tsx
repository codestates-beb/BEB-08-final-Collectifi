import React from 'react';
import styled from 'styled-components';
import {FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({isOpen}: {isOpen: boolean}) => (isOpen ? '100%' : '0')};
  top: ${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

const CloseIcon = styled(FaTimes)`
  color: #fff;
`;
const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

const SidebarWrapper = styled.div`
  color: #fff;
`;
// styled(Links)
const SidebarLink = styled(Link)`
  padding: 10px;
  /* background: grey; */

  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #969696;
    transition: 0.2s ease-in-out;
  }
`;
const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const SidebarMenu = styled.ul`
  /* display: grid; */
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6 80px);
  text-align: center;
  align-items: center;
  padding: 10px;
  margin: 10px;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;
const SidebarRoute = styled.div`
  border-radius: 50px;
  background: ${props => props.theme.mainColor};
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const Sidebar = ({isOpen, toggle}: {isOpen: boolean; toggle: () => void}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/draw">Pack</SidebarLink>
          <SidebarLink to="/upgrade">Upgrade</SidebarLink>
          <SidebarLink to="/staking">Staking</SidebarLink>
          <SidebarLink to="/swap">Swap</SidebarLink>
          <SidebarLink to="/market">Market</SidebarLink>
          <SidebarLink to="/win">Win</SidebarLink>
          <SidebarLink to="/community">Community</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute>Connect</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
