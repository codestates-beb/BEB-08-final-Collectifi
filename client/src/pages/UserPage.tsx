import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Mypage from '../components/mypage/MyPage';

const MarketPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense>
        <Mypage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MarketPage;
