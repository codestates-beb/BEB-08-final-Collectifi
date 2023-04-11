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

declare global {
  interface Window {
    ethereum?: {
      request: (args: any) => Promise<any>;
    };
  }
}

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
export const NavLogo = styled(Link)`
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
const NavItem = styled(Link)`
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
const NavBtnLink = styled.div`
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
`;

const Header = ({toggle}: PageLayoutProps) => {
  const [dropdown, setDropdown] = useState('');

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
      name: 'Play',
      link: '/draw',
      submenu: [
        {name: 'Draw', link: '/draw'},
        {name: '강화', link: '/upgrade'},
        // {name: '승부', link: '/prediction'},
      ],
    },
    {
      name: 'Earn',
      link: '/staking',
      submenu: [
        {name: 'Staking', link: '/staking'},
        {name: 'Swap', link: '/swap'},
      ],
    },
    {name: 'Market', link: '/market'},
    {name: 'Win', link: '/win'},
    {name: 'Community', link: '/community'},
  ];

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.log('Ethereum not detected in browser');
      return;
    }
    await window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(res => {
        // setAccount(res[0]);
        // setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', res[0]);
      })

      .catch(e => console.log(e));
  };

  return (
    <>
      <Nav variants={navVariants} animate={headerAnimation} initial={'top'}>
        {/* <Nav scrollNav={scrollNav}> */}
        <NavbarContainer>
          {/* <NavLogo to="/">COLLECTIFI</NavLogo> */}
          <NavLogo to="/">Collectifi</NavLogo>
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

            {/* <NavItem to="" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <NavLink>
                Earn
                <FontAwesomeIcon icon={faCaretDown} />
                {dropdown && <Dropdown dropdown={dropdown} setDropdown={setDropdown} />}
              </NavLink>
            </NavItem>
            <NavItem to="">
              <NavLink>Market</NavLink>
            </NavItem>
            <NavItem to="">
              <NavLink>Win</NavLink>
            </NavItem>
            <NavItem to="">
              <NavLink>Community</NavLink>
            </NavItem> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink
              onClick={() => {
                connectWallet();
              }}
            >
              Connect
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Header;
