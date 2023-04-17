import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Market from '../components/market/Market';
import Fallback from '../components/Fallback';

const MarketPage = () => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Suspense>
        <Market />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MarketPage;
