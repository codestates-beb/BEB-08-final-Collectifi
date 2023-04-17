import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { sellCardQuery, getSellCardListQuery } from '../../modules/market/atom';

import { nft } from '../../modules/type';
import PageTitle from '../UI/PageTitle';
import Tab from '../UI/Tab';
import CardList from './CardList';
import CardListItem from './CardListItem';
import PlayerCard from '../UI/PlayerCard';

const Market = () => {
  const cardList = useRecoilValue(sellCardQuery).data.data;
  //const a = cardList.data.data;
  const cardListRefresh = useRecoilRefresher_UNSTABLE(getSellCardListQuery);
  // cardListRefresh();
  console.log(cardList);

  useEffect(() => {
    cardListRefresh();
  }, []);

  return (
    <MarketLayout>
      <PageTitle title='MARKET'/>
      <Tab title={["SAIL"]}>
        <CardList itemWidth={"250px"}>
          {cardList.map((el:nft ,i:number) => {
            return (
              <CardListItem 
                key={i}
                info={`${el.selling_price}`}
                linkTo={`${el.token_id}`} 
              >
                <PlayerCard 
                  imgSrc={el.img_url}
                  //cardWidth={cardWidth}
                  //glow={Glow.orange}
                />
              </CardListItem>
            )
          })}  
        </CardList> 
      </Tab>
    </MarketLayout>)
}

export default Market;

const MarketLayout = styled.div`
  padding: 40px 20px 30px;
  max-width: 1140px;
  margin: 0 auto;
`