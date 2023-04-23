import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Gallery from '../components/gallery/Gallery';

const StakingPage = () => {
  return (
    <ErrorBoundary fallback={<div>error...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
    </ErrorBoundary>
  );
};

export default StakingPage;
