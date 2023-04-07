import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import PageLayout from './components/PageLayout';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Community from './pages/CommunityPage';
import DrawCardPage from './pages/DrawCardPage';
import UpgradeCardPage from './pages/UpgradeCardPage';
import StakingPage from './pages/StakingPage';
import SwapPage from './pages/SwapPage';
import MarketPage from './pages/MarketPage';
import WinPage from './pages/WinPage';

const Router: React.FC<{toggle: () => void}> = props => {
  return (
    <Routes>
      <Route element={<PageLayout toggle={props.toggle} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/draw" element={<DrawCardPage />} />
        <Route path="/upgrade" element={<UpgradeCardPage />} />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/win" element={<WinPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
