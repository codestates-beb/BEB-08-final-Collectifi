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
import styled, {keyframes} from 'styled-components';
import {toast} from 'react-toastify';
import {TypeAnimation} from 'react-type-animation';

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
  @media screen and (max-width: 780px) {
    font-size: 10px;
    padding: 10px 20px;
  }
`;
const MainTypeAnimation = styled(TypeAnimation)`
  /* background: white; */
  color: #fff;
  position: absolute;
  border-radius: 5px;
  top: 80%;
  left: 15%;
  z-index: 1;
  font-size: 2.5em;
  @media screen and (max-width: 780px) {
    font-size: 1em;
  }
`;
const Section = styled.div`
  line-height: 0;
  display: flex;
  flex-direction: column;
`;
const Section2Image = styled.img`
  /* background-size: cover; */
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 1;
`;
const Section3Images = styled.div`
  /* position: relative; */
  background-image: url('/upgrade_background.jpg');
`;
const Section3Image = styled.img`
  /* background-size: cover; */
  /* width: 100%;
  height: 100%;
  margin: 0 auto; */
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const FloatingDiv = styled.div`
  position: relative;
  animation-name: ${floatAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;
const Balloon1 = styled.div<{bgImage: string}>`
  background-image: ${({bgImage}) => `url(${bgImage})`};
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  /* height: 1080px; */
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
        {/* <MainTypeAnimation
          sequence={[
            'Own your NFT', // Types 'One'
            2000, // Waits 1s
            'Own your Player', // Deletes 'One' and types 'Two'
            2000, // Waits 2s
            'Upgrade your Player', // Types 'Three' without deleting 'Two'
            1800,
            () => {
              console.log('Sequence completed'); // Place optional callbacks anywhere in the array
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{display: 'inline-block'}}
        /> */}
      </ImagWrapper>
      <Section>
        <Section2Image src="/trophy.png" />
        <Section3Images>
          {/* <Section3Image src="/upgrade_background.jpg" /> */}
          {/* <Section3Image src="/balloon1.png" />
          <Section3Image src="/balloon1.png" /> */}

          <FloatingDiv>
            <Balloon1 bgImage="/balloon1.png" />
            <Balloon1 bgImage="/balloon2.png" />
          </FloatingDiv>
        </Section3Images>
      </Section>
    </>
  );
};

export default MainPage;
