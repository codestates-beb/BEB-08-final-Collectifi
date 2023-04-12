import React from 'react';
import styled from 'styled-components';
import Confetti from '../components/UI/Confetti';
import CardList from '../components/market/CardList';
import CardListItem from '../components/market/CardListItem';
import PlayerCard from '../components/UI/PlayerCard';
import {Layout} from '../Styles';

const TargetCard = styled.div`
  display: flex;
  justify-content: center;
  /* background: yellow; */
  margin: 10px;
  padding: 10px;
  gap: 10px;
  box-shadow: 5px 5px 5px 5px gray;
`;
const CardInfo = styled.div`
  padding: 10px;
  margin: 10px;
`;

const UpgradeCardPage = () => {
  return (
    <>
      <Layout>
        <h2>Upgrade Card</h2>
        <label>Select your target Card</label>
        <div>강화할 카드</div>
        <TargetCard>
          <CardListItem>
            <PlayerCard
              imgSrc="https://gateway.pinata.cloud/ipfs/QmVGZEoL8pzxfKwfj68GHtBScaGyPkX2REs4KuytewvLJP?filename=1-1.png"
              cardWidth={'200px'}
            />
          </CardListItem>
          <CardInfo>
            <div>카드명: Lionel Messi </div>
            <div>시즌: 2011 - 2012</div>
            <div>73 Goals / 29 Assists</div>
            <div>강화 성공률: 25%</div>
            <div>강화 비용: 150 ETH</div>
            <div>보유 ETH: 0.00031 ETH</div>
            <button>강화하기</button>
            <Confetti innerText={'성공'} />
          </CardInfo>
        </TargetCard>
      </Layout>

      <div>나의 카드 리스트</div>
      <CardList itemWidth="250px" />
    </>
  );
};

export default UpgradeCardPage;

// type Props = {
//   itemWidth: string;
// }

// const CardListLayout = styled.ul<Props>`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(${props => props.itemWidth}, auto));
//   gap: 20px;`
