import React from 'react';
import { Suspense } from 'react';
import { ErrorBoundary} from 'react-error-boundary';
import CardDetail from '../components/market/CardDetail';
import Fallback from '../components/Fallback';



const MarketPage = () => {

  return (
    // <ErrorBoundary fallback={<Fallback />}>
    <ErrorBoundary fallback={<div>error!</div>}>
      <Suspense>
        <CardDetail />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MarketPage;
