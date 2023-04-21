import React, {useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Layout = styled.div`
  margin-top: 100px;
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 600px;
  height: 600px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  background-color: #fd115c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const TabBox = styled.div`
  background-color: #05050b;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  display: flex;
  font-size: 35px;
  font-weight: 600;
  color: white;
`;

const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  border-radius: 5px;
  margin-top: 10px;
  background-color: #262a56;
  padding: 20px 20px;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: white;
`;

const Input = styled.input`
  all: none;
  background-color: #262a56;
  border: none;
  height: 70px;
  font-size: 40px;
  padding: 15px;
  color: white;
  font-weight: 600;
`;

const CalBox = styled.div`
  margin-top: 10px;
  /* background-color: pink; */
  font-size: 50px;
  font-weight: 700;
  :hover {
    cursor: pointer;
    scale: 1.15;
  }
`;

const BtnBox = styled.div`
  background-color: #262a56;
  font-size: 35px;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  padding: 15px;

  :hover {
    cursor: pointer;
    scale: 1.05;
  }
`;

const SwapPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const [ethAmount, setEthAmount] = useState();
  const [colAmount, setColAmount] = useState();
  const navigate = useNavigate();

  const handleCalClick = async () => {
    const response = await axios.post(
      'http://localhost:8000/exchange/swapaccount',
      {ethAmount},
      {withCredentials: true},
    );
    console.log(response.data.data);
    setColAmount(response.data.data.colAmount);
  };

  const handleSwap = async () => {
    if (confirm('Do you want to Swap ETH to COL?')) {
      const response = await axios.post(
        'http://localhost:8000/exchange/swap',
        {ethAmount},
        {withCredentials: true},
      );
      if (response.status == 200) {
        toast.success('Swap is Successfully finished!!!');
      }
    } else {
      console.log('hi');
    }
  };

  return (
    <Layout>
      <Container>
        <TabBox>
          <Tab style={{backgroundColor: '#414792'}}>SWAP</Tab>
          <Tab onClick={() => navigate('/pool')}>POOL</Tab>
        </TabBox>
        <InputBox>
          <InputTitle>Input : ETH</InputTitle>
          <Input
            placeholder="ETH"
            value={ethAmount}
            onChange={(e: any) => setEthAmount(e.target.value)}
          />
        </InputBox>
        <CalBox onClick={handleCalClick}>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </CalBox>
        <InputBox>
          <InputTitle>Output : COL</InputTitle>
          <Input placeholder="COL" value={colAmount} />
        </InputBox>

        <BtnBox onClick={handleSwap}>SWAP!</BtnBox>
      </Container>
    </Layout>
  );
};

export default SwapPage;
