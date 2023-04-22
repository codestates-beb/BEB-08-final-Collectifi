import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

type Props = {
  listItem: React.ReactNode[];
  gridTemplateColumns: string;
  linkTo?: string;
  onClick?: () => void;
  className?: string;
  isPreventDefault?: boolean;
  isSelected?: boolean;
  //children: React.ReactNode[];
};

const BoardListItem: React.FC<Props> = props => {
  //const col = React.Children.count(props.children);
  const col = props.listItem.length;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if(props.isPreventDefault) 
      event.preventDefault();
    if(props.onClick)
      props.onClick();
  }

  return (
    <BoardListItemLayout 
      linkTo={props.linkTo} 
      className={props.className}
      isClick={props.onClick}
    >
      <Link to={props.linkTo || ""} onClick={handleClick}>
        <BoardListItemRow className='title' gridTemplateColumns={props.gridTemplateColumns} col={col} isSelected={props.isSelected}>
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

const BoardListItemLayout = styled.li<{linkTo?: string; isClick?: () => void;}>`
  ${props => (!props.linkTo && !props.isClick) && `pointer-events: none;`}
`
const BoardListItemRow = styled.div<{gridTemplateColumns: string; col: number; isSelected?: boolean}>`
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

  ${props => props.isSelected && `
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 1px ${props.theme.mainColor};
    //border: none;
    //border: 1px solid ${props.theme.mainColor}
    //background: linear-gradient(rgb(212, 212, 212) 0%, rgb(215, 215, 215) 100%);
  `}
`
