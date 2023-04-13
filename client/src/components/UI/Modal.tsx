import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

type Props = {
  onConfirm: () => void;
  children: React.ReactNode;
};

const Backdrop: React.FC<{onConfirm: () => void}> = props => {
  return <BackdropLayout className={'backdrop'} onClick={props.onConfirm} />;
};

const ModalOverlay: React.FC<{children: React.ReactNode}> = props => {
  return <ModalOverlayLayout className="modal">{props.children}</ModalOverlayLayout>;
};

const Modal: React.FC<Props> = props => {
  const backdropRoot = document.getElementById('backdrop-root');
  const overlayRoot = document.getElementById('overlay-root');
  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, backdropRoot)}
      {overlayRoot &&
        ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayRoot)}
    </>
  );
};

export default Modal;

const BackdropLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background: rgba(0, 0, 0, 0.75);
`;

const ModalOverlayLayout = styled.div`
  position: fixed;
  top: 30vh;
  left: 33%;
  width: 34%;
  z-index: 100;
  overflow: hidden;
  background: rgb(250, 250, 250);
  border-radius: 20px;
  @media only screen and (max-width: 1000px) {
    left: 25%;
    width: 50%;
  }
`;
