import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import Button from './Button';

type Props = {
  title: string; 
  message: string; 
  onConfirm: () => void;
}

const Backdrop: React.FC<{onConfirm: () => void}> = (props) => {
  return <StyledBackdrop className={'backdrop'} onClick={props.onConfirm} />;
};

const ModalOverlay:React.FC<Props> = (props) => {
  return (
    <StyledModalOverlay className='modal'>
      <header className='header'>
        <h2>{props.title}</h2>
      </header>
      <div className='content'>
        <p>{props.message}</p>
      </div>
      <footer className='actions'>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </StyledModalOverlay>
  );
};

const AlertModal: React.FC<Props> = (props) => {
  const backdropRoot = document.getElementById('backdrop-root');
  const overlayRoot = document.getElementById('overlay-root');
  return (
    <>
      {backdropRoot && ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        backdropRoot
      )}
      {overlayRoot && ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        overlayRoot
      )}
    </>
  );
};

export default AlertModal;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;

  & .header {
    background: #4f005f;
    padding: 1rem;
  }

  & .header h2 {
    margin: 0;
    color: white;
  }

  & .content {
    padding: 1rem;
  }

  & .actions {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: 768px) {
    .modal {
      left: calc(50% - 20rem);
      width: 40rem;
    }
  }
`