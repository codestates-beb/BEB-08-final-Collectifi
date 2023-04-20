import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

type Props = {
  listItem: React.ReactNode[];
  gridTemplateColumns: string;
  linkTo?: string;
  onClick?: () => void;
  className?: string;
  //children: React.ReactNode[];
};

const BoardListItem: React.FC<Props> = props => {
  //const col = React.Children.count(props.children);
  const col = props.listItem.length;
  return (
    <BoardListItemLayout linkTo={props.linkTo} className={props.className} isClick={props.onClick}>
      <Link to={props.linkTo || ''} onClick={props.onClick}>
        <BoardListItemRow
          className="title"
          gridTemplateColumns={props.gridTemplateColumns}
          col={col}
        >
          {/* {React.Children.map(props.children, (child, i) => <div className='item' key={i}>{child}</div>)} */}
          {props.listItem.map((el, i) => (
            <div className="item" key={i}>
              {el}
            </div>
          ))}
        </BoardListItemRow>
      </Link>
    </BoardListItemLayout>
  );
};

export default BoardListItem;

const BoardListItemLayout = styled.li<{linkTo?: string; isClick?: () => void}>`
  ${props => !props.linkTo && !props.isClick && `pointer-events: none;`}
`;
const BoardListItemRow = styled.div<{gridTemplateColumns: string; col: number}>`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns};
  border-bottom: 1px solid ${props => props.theme.lineColor};
  &:hover {
    background: linear-gradient(rgb(236, 236, 236) 0%, rgb(239, 239, 239) 100%);
  }

  & .item {
    padding: 24px 12px;
    //width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
