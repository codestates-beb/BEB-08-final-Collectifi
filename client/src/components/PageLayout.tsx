import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import FloatingButton from './UI/FloatingButton';
import styled from 'styled-components';

export interface PageLayoutProps {
  toggle: () => void;
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

const PageLayout = ({toggle}: PageLayoutProps) => (
  <>
    <Header toggle={toggle} />
    <Outlet />
    <FloatingButton />
    <Footer />
  </>
);

export default PageLayout;
