import React, {useState} from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Button from '../components/UI/Button';
import Tab from '../components/UI/Tab';
import Modal from '../components/UI/Modal';
import ModalAlert from '../components/UI/ModalAlert';
import Input from '../components/UI/Input';
import Market from '../components/market/Market';
import MyPage from '../components/mypage/MyPage';
import CardDetail from '../components/market/CardDetail';
import {DummyComponent} from '../Styles';
import styled from 'styled-components';
import {toast} from 'react-toastify';

const ImagWrapper = styled.div`
  width: 100%;
  padding: 10px 100px 30px 100px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const MainImg = styled.img`
  /* left: 30px; */
  width: 80%;
  height: 80%;
  border-radius: 40px;
  /* margin: 10px 10px 10px 10px; */
  position: relative;
  z-index: 1;
`;
const MainBack = styled.div`
  background-size: contain;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.3) 20%,
      rgba(255, 255, 255, 0.6) 45%,
      rgba(255, 255, 255, 0.9) 70%,
      rgba(255, 255, 255, 1) 100%
    ),
    url('/main1.png') no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: -70px;
  left: 0;
  z-index: 0;
  opacity: 0.5;
  filter: blur(10px);
`;

const MainButton = styled.div`
  background: ${props => props.theme.mainColor};
  position: absolute;
  border-radius: 15px;
  top: 80%;
  left: 70%;
  z-index: 1;
  font-weight: bold;
  white-space: nowrap;
  padding: 15px 25px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transform: translate(-40%, -50%);
`;
const Section = styled.div`
  line-height: 0;
`;
const Section2Image = styled.img`
  /* background-size: cover; */
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const MainPage = () => {
  const [error, setError] = useState<any>(null);
  const [error2, setError2] = useState<any>(null);
  const [error3, setError3] = useState<any>(null);
  const errorHandler = () => {
    setError(null);
    setError2(null);
    setError3(null);
  };
  const errorHandler2 = () => {
    setError(null);
    setError2(null);
    setError3(null);
  };
  const Toast = () => {
    toast('first notification');
  };
  return (
    <>
      {/* <Button
        onClick={() => {
          setError('asd');
        }}
      >
        MODAL1
      </Button>
      <Button
        onClick={() => {
          setError2('asd');
        }}
      >
        MODAL2
      </Button>
      <Button
        onClick={() => {
          setError3('asd');
        }}
      >
        MODAL3
      </Button>

      {error && <ModalAlert title={'title'} message={'message'} onConfirm={errorHandler} />}
      {error2 && (
        <ModalAlert
          title={'title'}
          message={'message'}
          onConfirm={errorHandler}
          onConfirm2={errorHandler2}
        />
      )}
      {error3 && (
        <Modal onConfirm={errorHandler}>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
        </Modal>
      )}

      <label htmlFor="input" />
      <Input id="input" placeholder="INPUT" />

      <Tab title={['TEST1', 'TEST2', 'TEST3']}>
        <div>test1</div>
        <div>test2</div>
        <div>test3</div>
      </Tab>
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense>
          <Market />
          <MyPage />
          <CardDetail />
        </Suspense>
      </ErrorBoundary> */}
      <ImagWrapper>
        <MainImg src="/main1.png" />
        <MainBack />
        <MainButton onClick={Toast}>Get Player NFT</MainButton>
      </ImagWrapper>
      <Section>
        <Section2Image src="/trophy.png" />
        <Section2Image src="/upgrade.png" />
      </Section>
      <DummyComponent />
      <DummyComponent />
      <DummyComponent />
    </>
  );
};

export default MainPage;
