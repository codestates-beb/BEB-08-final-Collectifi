import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { userId, userNickname, userAmount } from '../modules/atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser } from '@fortawesome/free-solid-svg-icons';
import { darken } from "polished";

const MyInfo = () => {
  const id = useRecoilValue(userId);
  const nickName = useRecoilValue(userNickname);
  const amount = useRecoilValue(userAmount);
  //console.log("myinfo", nickName, amount);
  return <MyInfoLayout>
    <div className="amount">
      <FontAwesomeIcon icon={faCoins} />
      <span>{amount}</span>
    </div>
    <div className="nickname">    
      <Link to={`/user/${id}`}>
        <FontAwesomeIcon icon={faUser} />
        <span>{nickName}</span>
        </Link>      
    </div>    
  </MyInfoLayout>;
}

export default MyInfo;

const MyInfoLayout = styled.div`
  display: inline-flex;
  align-items: center;

  & .amount {
    display: inline-flex;
    color: rgb(123, 123, 123);
    margin-right: 10px;
  }
  & .nickname {
    display: inline-flex;
  }
  & a {
    color: rgb(123, 123, 123);
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      color: ${darken(0.1, 'rgb(123, 123, 123)')};
    }
    &:active {
      color: ${darken(0.2, 'rgb(123, 123, 123)')};
    }  
  }
  & svg {
    margin-right: 5px;
  }
`