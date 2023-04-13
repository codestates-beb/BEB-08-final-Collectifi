import React from 'react';
import styled from 'styled-components';
import CardListItem from './CardListItem';

type Props = {
  itemWidth: string;
  children: React.ReactElement<typeof CardListItem>;
  //children: React.ReactNode;
}

const CardList: React.FC<Props> = (props) => {
  return (
    <CardListLayout itemWidth={props.itemWidth}>
      {props.children}
    </CardListLayout>
  )
}

export default CardList;

const CardListLayout = styled.ul<Props>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${props => props.itemWidth}, auto));
  gap: 20px;

  // display: flex;
  // flex-wrap: wrap;  
  // justify-content: space-between;
  // & li {
  //   flex: 1;
  // }
`