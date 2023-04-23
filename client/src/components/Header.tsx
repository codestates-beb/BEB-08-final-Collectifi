import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
// import { Link } from 'react-scroll';
import {useAnimation, motion, useScroll} from 'framer-motion';
import {FaBars} from 'react-icons/fa';
import {PageLayoutProps} from './PageLayout';
// import {f} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Dropdown from './Dropdown';
import axios from 'axios';
import {useRecoilValue, useRecoilCallback, useRecoilRefresher_UNSTABLE} from 'recoil';
import {
  userAddr,
  userId,
  userNickname,
  userAmount,
  userReferral,
  logoutQuery,
} from '../modules/atom';
import {getUserQuery} from '../modules/mypage/atom';
import MyInfo from './MyInfo';
import {darken} from 'polished';
import Cookies from 'js-cookie';

import {toast} from 'react-toastify';
declare global {
  interface Window {
    ethereum?: {
      request: (args: any) => Promise<any>;
    };
  }
}

const navVariants = {
  top: {
    backgroundColor: 'rgb(250, 250, 250)', // 'white', '#333333',
    boxShadow: 'none',
  },
  scroll: {
    //backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

const Nav = styled(motion.div)`
  height: 80px;
  /* margin-top: -70px; */
  display: flex;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  align-items: center;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

const NavbarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 3fr 1fr;
  max-width: 1140px;
  padding: 0 20px;

  //display: flex;
  //justify-content: space-between;
  //height: 70px;
  z-index: 1;
  //width: 100%;
  //padding: 0 24px;
  //max-width: 1100px;
  //margin-top: 10px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 15fr 1fr;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImgDiv = styled(Link)`
  object-fit: contain;
  border: none;
  border-radius: 10px;
  background-image: url('/logo/2.png');
  background-size: contain;
  width: 35px;
  height: 35px;
`;

export const NavLogo = styled(Link)`
  color: black;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  /* margin-left: 24px; */
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
    color: #404040;
  }
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  //margin-right: -22px;
  //margin-top: 5px;
  //padding: 6px;
  justify-self: center;
  align-self: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavItem = styled(Link)`
  /* height: 80px; */
  height: 100%;
  margin: 3px;
  &:hover {
    background: rgb(241, 241, 241);
    border-radius: 20px 20px 20px 20px;
  }
`;
const NavLink = styled.div`
  font-weight: 600;
  //color: #616161;
  color: rgb(123, 123, 123);
  font-size: 14px;
  display: flex;
  gap: 5px;
  align-items: center;
  text-decoration: none;
  padding: 1rem 1rem;
  height: 100%;
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavBtnLink = styled.div`
  font-weight: bold;
  border-radius: 50px;
  background: ${props => props.theme.mainColor};
  white-space: nowrap;
  padding: 13px 22px;
  color: #fff;
  font-size: 0.875rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 110px;

  &:hover {
    transition: all 0.2s ease-in-out;
    //background: #fff;
    //color: #010606;
    background: ${props => darken(0.1, props.theme.mainColor)};
  }
  &:active {
    background: ${props => darken(0.2, props.theme.mainColor)};
  }
`;

const MyInfoBox = styled.div`
  justify-self: right;
  align-self: center;
  padding-right: 20px;
`;

const Header = ({toggle}: PageLayoutProps) => {
  const [dropdown, setDropdown] = useState('');
  //const [account, setAccount] = useState('');
  const currId = useRecoilValue(userId);
  const logoutRefresh = useRecoilRefresher_UNSTABLE(logoutQuery);
  const userRefresh = useRecoilRefresher_UNSTABLE(getUserQuery);

  const onMouseEnter = (e: string) => {
    if (window.innerWidth < 768) {
      setDropdown(e);
    } else {
      setDropdown(e);
    }
  };

  const onMouseLeave = () => {
    setDropdown('');
  };

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

  const menu = [
    {
      name: 'PLAY',
      link: '/draw',
      submenu: [
        {name: 'PACK', link: '/draw'},
        {name: 'UPGRADE', link: '/upgrade'},
        // {name: '승부', link: '/prediction'},
      ],
    },
    {
      name: 'EARN',
      link: '/gallery',
      submenu: [
        {name: 'STAKING', link: '/gallery'},
        {name: 'SWAP', link: '/swap'},
      ],
    },
    {name: 'MARKET', link: '/market'},
    {name: 'WIN', link: '/win'},
    {name: 'COMMUNITY', link: '/community'},
    {
      name: 'OTHERS',
      link: '/event',
      submenu: [
        {name: 'EVENT', link: '/event'},
        {name: 'DONATION', link: '/donation'},
      ],
    },
  ];

  const login = useRecoilCallback(({set}) => async () => {
    if (!window.ethereum) {
      console.log('Ethereum not detected in browser');
      return;
    }
    await window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(res => {
        //setAccount(res[0]);
        // 백엔드로 로그인 요청
        axios
          .post('http://localhost:8000/login', {address: res[0]}, {withCredentials: true})
          .then(res => {
            console.log('login_post success: ', res);
            if (!res.data.data) return;
            set(userAddr, res.data.data.address);
            set(userId, res.data.data.id);
            set(userNickname, res.data.data.nickname);
            set(userAmount, res.data.data.token_amount);
            set(userReferral, res.data.data.referral);
            toast.success('logged in successfully! 🎉');
          });
        // setIsLoggedIn(true);
        // localStorage.setItem('isLoggedIn', res[0]);
      })
      .catch(e => {
        console.log(e);
        toast.error('logged in failed');
      });
  });

  const logout = useRecoilCallback(({snapshot, set}) => async () => {
    const result = await snapshot.getPromise(logoutQuery);
    if (!result) return;
    set(userAddr, '');
    set(userId, 0);
    set(userNickname, '');
    set(userAmount, 0);
    set(userReferral, null);
    logoutRefresh();
    userRefresh();
    toast.success('logged out successfully! 🎉');
    console.log("logout", result);
    Cookies.remove('connect.sid');
  });

  return (
    <>
      <Nav variants={navVariants} animate={headerAnimation} initial={'top'}>
        <NavbarContainer>
          <Logo>
            <LogoImgDiv to="/" />
            <NavLogo to="/">Collectifi</NavLogo>
          </Logo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            {menu.map(item => (
              <NavItem
                key={item.name}
                to={item.link}
                onMouseEnter={() => onMouseEnter(item.name)}
                onMouseLeave={onMouseLeave}
              >
                <NavLink>
                  {item.name}
                  {item.submenu && (
                    <>
                      <FontAwesomeIcon icon={faCaretDown} />
                      {dropdown == item.name && (
                        <Dropdown setDropdown={setDropdown} submenu={item.submenu} />
                      )}
                    </>
                  )}
                </NavLink>
              </NavItem>
            ))}
          </NavMenu>
          <MyInfoBox>{currId !== 0 && <MyInfo />}</MyInfoBox>
          <NavBtn>
            <NavBtnLink
              onClick={() => {
                currId === 0 ? login() : logout();
              }}
            >
              {currId === 0 ? 'CONNECT' : 'DISCONN'}
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Header;
