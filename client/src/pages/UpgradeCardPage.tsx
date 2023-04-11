import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  max-width: 80%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1024px) {
    max-width: 93%;
  }
`;

const UpgradeCardPage = () => {
  return (
    <Layout>
      <h2>Upgrade Card</h2>
    </Layout>
  );
};

export default UpgradeCardPage;
