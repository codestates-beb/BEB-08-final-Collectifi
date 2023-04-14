import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import CardDetail from '../components/market/CardDetail';

const MarketPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error!</div>}>
      <Suspense>
        <CardDetail />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MarketPage;
