import React, { useRef, useState,  } from 'react';
import styled, { css } from 'styled-components';

import { useRecoilCallback } from 'recoil';
import { userNickname } from '../../modules/atom';
import { editNicknameQuery } from '../../modules/mypage/atom';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { darken } from 'polished';

const EditNickname = () => {
  const [isClickOk, setIsClickOk] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsClickOk(true);
  }

  const handleOkClick = useRecoilCallback(({ set, snapshot }) => async () => {
    if(!editInputRef.current) return;
    if(editInputRef.current.value.trim() === "") {
      setIsClickOk(false);
      return; 
    }
    const queryResult = await snapshot.getPromise(editNicknameQuery(editInputRef.current.value));
    console.log(queryResult)
    if(queryResult) {
      set(userNickname, editInputRef.current.value);
    } 
    setIsClickOk(false);
  });

  return <EditNickLayout>
    {isClickOk ? 
    <div>
      <EditNickButton color='rgb(250, 250, 250)' onClick={handleOkClick}>OK</EditNickButton>
      <label htmlFor="nickname-edit-input" />
      <EdidNickInput id="nickname-edit-input" placeholder="NEW NICKNAME" ref={editInputRef}/>
    </div>
    : <EditNickButton color='rgb(250, 250, 250)' onClick={handleEditClick}>EDIT</EditNickButton>    
    }       
  </EditNickLayout>
}

export default EditNickname;

const EditNickLayout = styled.div`
  & #nickname-edit-input {
    //padding: 10px;
  }
`
const EditNickButton = styled(Button)`
  color: rgb(123, 123, 123);
  padding: 9px 20px;
  font-weight: 100;
  margin-right: 10px;

  ${props => css`
    border: 1px solid ${props.theme.lineColor};
    &:hover {
      border: 1px solid ${props.theme.mainColor};
      color: ${props.theme.mainColor};
      background: ${props.color};
    }
    &:active {
      border: 1px solid ${darken(0.4, props.theme.mainColor)};
      color: ${darken(0.4, props.theme.mainColor)};
      background: ${props.color}
    }   
  `}
`

const EdidNickInput = styled(Input)`
  ${props => css`
    padding: 7px 14px 7px;
    border: none;
    box-shadow: 0 0 0 1px ${props.theme.lineColor};
    &:focus-visible {
      background-color: #fff;
      border: none;
      box-shadow: 0 0 0 2px ${props.theme.mainColor};
    }
  `}  
`