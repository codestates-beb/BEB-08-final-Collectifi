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

  return (
    <>
      <Button
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
          {/* <Market /> */}
          {/* <MyPage /> */}
          {/* <CardDetail /> */}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default MainPage;
