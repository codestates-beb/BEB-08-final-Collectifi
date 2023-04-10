import React from 'react';
import styled, { css } from 'styled-components';

import Modal from './Modal';
import Button from './Button';

type Props = {
  title: string; 
  message: string; 
  onConfirm: () => void;
  onConfirm2?: () => void;
}

const ModalOverlay:React.FC<Props> = (props) => {
  let onConfirm = props.onConfirm;
  let onConfirm2 = props.onConfirm2;

  if(props.onConfirm2) { //버튼 두개일경우 함수 바꾸기
    onConfirm = props.onConfirm2;
    onConfirm2 = props.onConfirm;
  }

  return (
    <ModalOverlayLayout className='modal'>
      <header className='header'>
        <h2>{props.title}</h2>
      </header>
      <div className='content'>
        <p>{props.message}</p>
      </div>
      <footer className='actions'>
        <Button onClick={onConfirm} >OK</Button>
        {props.onConfirm2 && <Button onClick={onConfirm2} color='rgb(203, 203, 203)'>CANCLE</Button>}
      </footer>
    </ModalOverlayLayout>
  );
};

const ModalAlert: React.FC<Props> = (props) => {
  return (
    <div>
      <Modal onConfirm={props.onConfirm}>
        <ModalOverlay 
          title={props.title} 
          message={props.message} 
          onConfirm={props.onConfirm}
          onConfirm2={props.onConfirm2}
        />
      </Modal>
    </div>
  );
};

export default ModalAlert;


const ModalOverlayLayout = styled.div`  
  ${props => {
    return css`
    & .header {
      //background: ${props.theme.mainColor || 'transparent'};
      padding: 2rem 1rem 1rem;
    }
    `
  }}  

  & .header h2 {
    margin: 0;
    text-align: center;
    //color: white;
  }

  & .content {
    padding: 1rem;
    word-wrap: break-word;    
  }

  & .content p {
    line-height: 1.3;
  }

  & .actions {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  & .actions button {
    margin-left: 10px;
    width: 5.5rem;
  }
`