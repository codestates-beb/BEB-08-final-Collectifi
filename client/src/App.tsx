import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';
import Sidebar from './components/Sidebar';
import Router from './Router';
import ScrollReset from './components/ScrollReset';
import GlobalStyle from './Styles';
import Init from './components/Init';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HelmetProvider, Helmet} from 'react-helmet-async';

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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      } // 768px보다 크면 true, 작으면 false
    }
    handleResize(); // 컴포넌트가 마운트될 때 한번 실행
    window.addEventListener('resize', handleResize); // 화면 사이즈 변경 시 실행
    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    };
  }, []);
  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  const theme = {
    mainColor: 'rgb(253, 17, 92)',
    mainColor2: '#e52e93',
    lineColor: 'rgb(203, 203, 203)',
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Collectifi, the largest decentralized football community...</title>
      </Helmet>
      <RecoilRoot>
        <GlobalStyle />
        <Init />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ScrollReset />
            <Router toggle={toggle} />
            <Sidebar toggle={toggle} isOpen={isOpen} />
          </BrowserRouter>
        </ThemeProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
