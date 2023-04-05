import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// import { Link } from 'react-scroll';
import {useAnimation, motion, useScroll} from 'framer-motion';
import {FaBars} from 'react-icons/fa';
import {PageLayoutProps} from './PageLayout';

const navVariants = {
  top: {
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: '#000',
  },
  scroll: {
    backgroundColor: 'grey',
    // backgroundColor: 'white',
  },
};

const Nav = styled(motion.div)`
  background: '#000';
  height: 70px;
  /* margin-top: -70px; */
  display: flex;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;
const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;
const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavItem = styled.li`
  height: 80px;
`;
const NavLink = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavBtnLink = styled(Link)`
  font-weight: bold;
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px 22px;
  color: #fff;
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
  @media screen and (max-width: 960px) {
    max-width: 10ch;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
`;

const Header = ({toggle}: PageLayoutProps) => {
  const headerAnimation = useAnimation();
  const {scrollY} = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
        headerAnimation.start('scroll');
        // setDarkMode(false);
      } else {
        headerAnimation.start('top');
        // setDarkMode(true);
      }
    });
  }, [scrollY, headerAnimation]);

  return (
    <>
      <Nav variants={navVariants} animate={headerAnimation} initial={'top'}>
        {/* <Nav scrollNav={scrollNav}> */}
        <NavbarContainer>
          <NavLogo to="/">Hello</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLink>메뉴</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>목록</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>추가</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>하기</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>About</NavLink>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/">Connect to Wallet</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Header;
