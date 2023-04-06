import React from 'react';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import PageLayout from './components/PageLayout';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

const Router: React.FC<{toggle: () => void}> = (props) => {
  return (   
    <Routes>
      <Route element={<PageLayout toggle={props.toggle} />}>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/" element={<Home />} />
                      <Route path={`/users/:username`} element={<MyPage />} />
                      <Route path="/market" element={<Market />} />
                      <Route path="/create" element={<Create />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;