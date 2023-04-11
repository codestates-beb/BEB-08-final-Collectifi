import React from 'react';
import styled from 'styled-components';
import PageTitle from '../mypage/PageTitle';
import Tab from '../UI/Tab';
import CardList from './CardList';

const Market = () => {
  return (<MarketLayout>
      <PageTitle title='MARKET'/>
      <Tab title={["SAIL"]}>
        <CardList itemWidth='250px'/> 
      </Tab>
    </MarketLayout>)
}

export default Market;

const MarketLayout = styled.div`
  max-width: 80%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    max-width: 93%;
  }
`