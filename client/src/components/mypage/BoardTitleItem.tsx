import React from 'react';
import styled from 'styled-components';

type Props = {
  title: React.ReactNode[];
  gridTemplateColumns: string;
  //children: React.ReactElement<object, typeof PlayerCard>; //React.ReactNode
}

const BoardTitleItem: React.FC<Props> = (props) => {
  const col = props.title.length;
  return (
    <BoardTitleItemLayout>
      <BoardTitleItemRow className='title' gridTemplateColumns={props.gridTemplateColumns} col={col}>
        {props.title.map((el, i) => <div className= 'title-item'key={i}>{el}</div>)}
      </BoardTitleItemRow>
    </BoardTitleItemLayout>)
}

export default BoardTitleItem;

const BoardTitleItemLayout = styled.div``
const BoardTitleItemRow = styled.div<{gridTemplateColumns: string; col: number}>`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns};
  border-bottom: 1px solid ${props => props.theme.lineColor};

  & .title-item {
    padding: 16px 12px;
    font-size: 12px;
    font-weight: 600
  }
`