import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PageLayout from './components/PageLayout';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Community from './pages/CommunityPage';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';
import Router from './Router';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  // const [scrollNav, setScrollNav] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', changeNav);
  // }, []);

  // const changeNav = () => {
  //   if (window.scrollY <= 50) {
  //     setScrollNav(true);
  //   } else {
  //     setScrollNav(false);
  //   }
  // };
  const toggle = (): void => {
    setIsOpen(!isOpen);
  };
  const theme = {
    mainColor: '#111',
  };

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router toggle={toggle} />
          <Sidebar toggle={toggle} isOpen={isOpen} />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
