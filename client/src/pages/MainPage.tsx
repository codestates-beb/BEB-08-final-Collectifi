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
import CountUp from 'react-countup';

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  width: 100%;
  padding: 10px 100px 30px 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const MainImg = styled.img`
  /* left: 30px; */
  width: 100%;
  height: 100%;
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
    url('/bg3.png') no-repeat;
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
  text-shadow: 4px 0 #525252;
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
  position: relative;
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
const floatAnimation1 = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;
const floatAnimation2 = keyframes`
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
const floatAnimation3 = keyframes`
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

const FloatingDiv1 = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation-name: ${floatAnimation1};
  animation-duration: 4.2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const FloatingDiv2 = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation-name: ${floatAnimation2};
  animation-duration: 3.8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const FloatingDiv3 = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation-name: ${floatAnimation3};
  animation-duration: 4.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;
const CountUpS = styled(CountUp)`
  width: 100%;
  position: absolute;
  top: 5%;
  left: 41%;
  color: #f1c164;
  color: #5f4fec;
  font-family: 'Concert One', cursive;
  letter-spacing: 3vw;
  /* font-family: 'DynaPuff', cursive; */
  /* text-shadow: 0 0 50px #f1c164, 0 0 70px #f1c164, 0 0 90px #f1c164, 0 0 110px #f1c164,
    0 0 130px #f1c164; */
  text-shadow: -10px 0 #caa357, 0 10px #cfa655, 10px 0 #af8d4a, 0 -10px #be9c59;
  font-size: 12vw;
`;
const UpgradeBack = styled.img`
  width: 100%;
`;
const Balloon1 = styled.img`
  /* background-position: center;
  background-size: cover; */
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* height: 100%; */
  /* height: 1080px; */
`;
const Balloon2 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
  const [counterOn, setCounterOn] = useState(false);
  return (
    <MainLayout>
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

      <MainWrapper>
        <MainImg src="/bg3.png" />
        <MainBack />
        <MainButton onClick={Toast}>Get Player NFT</MainButton>
        <MainTypeAnimation
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
        />
      </MainWrapper>

      <Section2Image src="/trophy.png" />

      <Section>
        <UpgradeBack src="/upgrade_background.jpg" />
        <FloatingDiv1>
          <Balloon1 src="/balloon1.png" />
        </FloatingDiv1>
        <FloatingDiv2>
          <Balloon1 src="/balloon2.png" />
        </FloatingDiv2>
        <FloatingDiv3>
          <Balloon1 src="/balloon3.png" />
        </FloatingDiv3>

        <CountUpS start={0} end={25} duration={5} delay={0} />
      </Section>
    </MainLayout>
  );
};

export default MainPage;
