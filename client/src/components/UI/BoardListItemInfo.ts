import styled from 'styled-components';
import BoardListItem from './BoardListItem';

const BoardListItemInfo = styled(BoardListItem)<{isLast?:boolean}>`
  & .title {
    gap: 10px;
  }
  & .item {
    padding: 12px 0px;
  }  
  & .item:first-child {
    color: rgb(123, 123, 123)
  }
  & .item:last-child {
    justify-self: end;
  } 

  ${props => props.isLast && `
      & .title {
        border: transparent;
      }
    `
  }
`

export default BoardListItemInfo;