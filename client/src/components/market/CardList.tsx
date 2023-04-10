import React from 'react';
import styled from 'styled-components';

import PlayerCard, { Glow } from '../UI/PlayerCard';
import CardListItem from './CardListItem';

type Props = {
  itemWidth: string;
}

const CardList: React.FC<Props> = (props) => {
  return (<CardListLayout itemWidth={props.itemWidth}>
    {new Array(20).fill(0).map((el, i) => {
      return (
        <li key={i}>
          <CardListItem price={1000} onClick={()=>{return}}>
            <PlayerCard 
              imgSrc='https://gateway.pinata.cloud/ipfs/QmVGZEoL8pzxfKwfj68GHtBScaGyPkX2REs4KuytewvLJP?filename=1-1.png'
              cardWidth={props.itemWidth}
              //glow={Glow.orange}
            />
          </CardListItem>
        </li>        
      )
    })}
  </CardListLayout>)
}

export default CardList;

const CardListLayout = styled.ul<Props>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.itemWidth}, auto));
  gap: 20px;

  // display: flex;
  // flex-wrap: wrap;  
  // justify-content: space-between;
  // & li {
  //   flex: 1;
  // }
`