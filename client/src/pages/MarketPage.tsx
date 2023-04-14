import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Market from '../components/market/Market';

const MarketPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense>
        <Market />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MarketPage;
