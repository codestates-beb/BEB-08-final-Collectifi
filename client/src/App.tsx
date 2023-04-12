import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';
import Sidebar from './components/Sidebar';
import Router from './Router';
import ScrollReset from './components/ScrollReset';
import GlobalStyle from './Styles';

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
    mainColor: 'rgb(253, 17, 92)',
    lineColor: 'rgb(203, 203, 203)',
  };

  return (
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollReset />
          <Router toggle={toggle} />
          <Sidebar toggle={toggle} isOpen={isOpen} />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
