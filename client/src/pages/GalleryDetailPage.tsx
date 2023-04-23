import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import GalleryDetail from '../components/gallery/GalleryDetail';
import Fallback from '../components/Fallback';

const GalleryDetailPage = () => {
  return (
    <ErrorBoundary fallback={<div>error...</div>}>
      <Suspense>
        <GalleryDetail />
      </Suspense>
    </ErrorBoundary>
  );
};

export default GalleryDetailPage;
