import React from 'react';
import styled from 'styled-components';
import PlayerCard, { Glow } from '../UI/PlayerCard';
import PageTitle from '../UI/PageTitle';
import BoardList from '../UI/BoardList';
import BoardTitleItem from '../UI/BoardTitleItem';
import BoardListItemInfo from '../UI/BoardListItemInfo';
import BoardListItem from '../UI/BoardListItem';
import Button from '../UI/Button';
import Tab from '../UI/Tab';

const CardDetail = () => {
  const cardWidth = "350px";

  return (<CDLayout width={cardWidth}>
    <section className='top'>
      <div>
        <CDBox>
          <PlayerCard 
            imgSrc='https://gateway.pinata.cloud/ipfs/QmVGZEoL8pzxfKwfj68GHtBScaGyPkX2REs4KuytewvLJP?filename=1-1.png'
            cardWidth={cardWidth}
            glow={Glow.orange}
          />
        </CDBox>
      </div>
      <div>
        <PageTitle title='L.Messi'/>
        <BoardList>
          {new Array(6).fill(0).map((el, i, arr) => {
            const listItem = ["test1", "test2"];
            return (<BoardListItemInfo key={i} 
              listItem={listItem} 
              gridTemplateColumns='1fr 1fr'
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
  padding: 0 20px;
  max-width: 1140px; //1290px;
  margin: 0 auto;

  & .top {
    display: grid;
    align-items: center;
    //grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    //grid-template-columns: ${props => props.width} auto;
    grid-template-columns: minmax(auto, ${props => props.width}) minmax(300px, auto);
    gap: 40px;    

    @media only screen and (max-width: 768px) {
      grid-template-columns: auto;
    }
  }

  & .bottom {
    padding: 60px 0 0;
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