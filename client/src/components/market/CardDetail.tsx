import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currDetailCardId, sellCardByIdQuery } from '../../modules/market/atom';
import { useParams } from 'react-router-dom';

import PlayerCard, { Glow } from '../UI/PlayerCard';
import PageTitle from '../UI/PageTitle';
import BoardList from '../UI/BoardList';
import BoardTitleItem from '../UI/BoardTitleItem';
import BoardListItemInfo from '../UI/BoardListItemInfo';
import BoardListItem from '../UI/BoardListItem';
import Button from '../UI/Button';
import Tab from '../UI/Tab';

const CardDetail = () => {
  const { id } = useParams();
  const setCurrDetailCardId = useSetRecoilState(currDetailCardId);
  useEffect(() => {
    if(id) {
      setCurrDetailCardId(parseInt(id));
    }
  }, [id, setCurrDetailCardId]);

  const cardInfo = useRecoilValue(sellCardByIdQuery);
  console.log(cardInfo);
  if(!cardInfo) return <></>;

  const cardWidth = "350px";
  const infoTitle = ["TEAM", "SEASON", "PRICE"];
  const infoData = [cardInfo.team, cardInfo.season, cardInfo.isSell && cardInfo.selling_price];

  return (<CDLayout width={cardWidth}>
    <section className='top'>
      <div>
        <CDBox>
          <PlayerCard 
            imgSrc={cardInfo.img_url}
            cardWidth={cardWidth}
            glow={Glow.orange}
          />
        </CDBox>
      </div>
      <div>
        <PageTitle title={cardInfo.player}/>
        <BoardList>
          {infoData.map((el, i, arr) => {
            if(!el) return <></>;
            const listItem = [infoTitle[i], el];
            return (<BoardListItemInfo key={i} 
              listItem={listItem} 
              gridTemplateColumns='1fr 9fr'
              isLast={arr.length === i + 1}
              />)
          })}
        </BoardList>
        <div className='btn-wrapper'>
          <CDButton>BUY</CDButton>
        </div>
      </div>
    </section>
    <section className='bottom'>
      <div>
        <Tab title={["TX HISTORY", "OFFER"]}>
          <BoardList 
            title={<BoardTitleItem title={["HISTORY1", "HISTORY2", "HISTORY3"]} 
            gridTemplateColumns='1fr 2fr 1fr'/>
          }
          >
            {new Array(4).fill(0).map((el, i) => {
              const listItem = ["test1", "test2", <div key={i}>test3</div>];
              return (<BoardListItem key={i} 
                listItem={listItem} 
                gridTemplateColumns='1fr 2fr 1fr'/>)
            })}
          </BoardList>
          <BoardList 
            title={<BoardTitleItem title={["OFFER1", "OFFER2", "OFFER3", "OFFER4", "OFFER5"]} 
            gridTemplateColumns='1fr 2fr 2fr 1fr 1fr'/>}
          >
            {new Array(6).fill(0).map((el, i) => {
              const listItem = ["test1", "test2", "test3", "test4", "test5"];
              return (<BoardListItem key={i} 
                listItem={listItem} 
                gridTemplateColumns='1fr 2fr 2fr 1fr 1fr'/>)
            })}
          </BoardList>
        </Tab>        
      </div>
    </section>
  </CDLayout>)
}

export default CardDetail;

const CDLayout = styled.div<{width: string}>`
  padding: 60px 20px 40px;
  max-width: 1140px; //1290px;
  margin: 0 auto;

  & .top {
    display: grid;
    align-items: center;
    //grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    //grid-template-columns: ${props => props.width} auto;
    grid-template-columns: minmax(auto, ${props => props.width}) minmax(300px, auto);
    gap: 40px;     
  }

  & .bottom {
    padding: 60px 0 0;
  }

  @media only screen and (max-width: 768px) {
    padding-top: 20px;
    & .top { 
      grid-template-columns: auto;
    }    
  }
`

const CDBox = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: rgba(203, 203, 203, 0.3);
  border-radius: 40px;
  padding: 40px;
  font-weight: 600;
  text-align: center;
`

const CDButton = styled(Button)`
  margin-top: 20px;
  width: 50%;
`