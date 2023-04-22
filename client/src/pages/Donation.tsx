import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Layout} from '../Styles';
import {MiddleBox, TopBox, TopTitle} from './Event';
import styled from 'styled-components';
import Web3 from 'web3';

interface Info {
  img_url?: string;

  raisedAmount?: number;

  raisedEth?: number;

  targetAmount?: number;

  targetEth?: number;

  title?: string;

  percent?: number;
}

const GridContainer = styled.div`
  padding: 30px 30px;
  width: 100%;
  /* background-color: blue; */
  height: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const DonationBox = styled.div`
  height: 300px;
  /* background-color: aqua; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  :hover {
    cursor: pointer;
    scale: 1.06;
  }
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
`;

const DonationImg = styled.div<{bgImage: any}>`
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 200px;

  background-image: ${({bgImage}) => `url(${bgImage})`};
`;

const DonationTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5px;
`;

const DonationPercent = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-right: 10px;
`;

const DonationTarget = styled.div`
  margin-right: 10px;
  font-size: 15px;
  opacity: 0.8;
`;

const DonationBottom = styled.div`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
`;

interface BarSegmentProps {
  width?: number;
  color: string;
}

const BarSegment = styled.div<BarSegmentProps>`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
  font-size: 25px;
  font-weight: 600;
  width: ${props => `${props.width}%`};
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => `${props.color}`};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  border-radius: 30px;
  width: 75%;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 400px;
  background-color: white;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ModalInput = styled.input`
  width: 75%;
  height: 40px;
  padding: 5px;
`;

const ModalAmount = styled.div`
  height: 10px;
`;

const ModalBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: #fd115c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RefundBtn = styled.div`
  margin-right: 15px;
  background-color: #fd115c;
  color: white;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
  font-weight: 600;
`;

const Donation = () => {
  const [infos, setInfos] = useState<Info[]>([]);
  const [isModalOpenOne, setIsModalOpenOne] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [isModalOpenThree, setIsModalOpenThree] = useState(false);
  const [amount, setAmount] = useState<any>();

  const setChange = (e: any) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const openModalOne = () => {
    setIsModalOpenOne(true);
  };
  const openModalTwo = () => {
    setIsModalOpenTwo(true);
  };

  const openModalThree = () => {
    setIsModalOpenThree(true);
  };

  const closeModalOne = () => {
    setIsModalOpenOne(false);
  };
  const closeModalTwo = () => {
    setIsModalOpenTwo(false);
  };

  const closeModalThree = () => {
    setIsModalOpenThree(false);
  };
  const handleClick = async (e: any) => {
    e.preventDefault();
    const weiAmount = Web3.utils.toWei(amount.toString(), 'ether');
    const hexAmount = Web3.utils.toHex(weiAmount);
    console.log(hexAmount);
    const params = [
      {
        from: '0x19A49D592c34dCcdA2B11c926609F84621e34480',

        to: '0x9209224bE464Fec24a7C08A78eD87c2Df4335EdD',
        value: hexAmount,
      },
    ];
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params,
        })
        .then(txHash => console.log(txHash));
    }
  };

  const handleClickTwo = async (e: any) => {
    const response = await axios.post(
      'http://localhost:8000/donation',
      {amount},
      {withCredentials: true},
    );
  };
  const handleClickThree = async (e: any) => {
    const response = await axios.post(
      'http://localhost:8000/donation/refund',

      {withCredentials: true},
    );
    console.log(response);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/donation', {withCredentials: true}).then((res: any) => {
      setInfos(res.data.data.donations);
      console.log(res.data.data.donations);
    });

    console.log('hi');
  }, []);
  return (
    <Layout>
      <TopBox>
        <TopTitle>Donations</TopTitle>
      </TopBox>
      <MiddleBox>
        {infos ? (
          <GridContainer>
            <DonationBox onClick={openModalOne}>
              <DonationImg bgImage={infos[0]?.img_url} />
              <BarSegment width={infos[0]?.percent} color="#fd115c" />
              <DonationTop>
                <DonationPercent>{infos[0]?.percent}%</DonationPercent>
                <DonationTarget>{infos[0]?.raisedEth} ETH /</DonationTarget>
                <DonationTarget>{infos[0]?.targetEth} ETH</DonationTarget>
              </DonationTop>
              <DonationBottom>{infos[0]?.title}</DonationBottom>
            </DonationBox>
            <DonationBox onClick={openModalTwo}>
              <DonationImg bgImage={infos[1]?.img_url} />
              <BarSegment width={infos[1]?.percent} color="#fd115c" />
              <DonationTop>
                <DonationPercent>{infos[1]?.percent}%</DonationPercent>
                <DonationTarget>{infos[1]?.raisedAmount} COL /</DonationTarget>
                <DonationTarget>{infos[1]?.targetAmount} COL</DonationTarget>
              </DonationTop>
              <DonationBottom>{infos[1]?.title}</DonationBottom>
            </DonationBox>
            <DonationBox onClick={openModalThree}>
              <DonationImg style={{opacity: 0.4}} bgImage={infos[2]?.img_url} />
              <BarSegment width={infos[2]?.percent} color="#fd115c" />
              <DonationTop>
                <DonationPercent>{infos[2]?.percent}%</DonationPercent>
                <DonationTarget>{infos[2]?.raisedEth} ETH /</DonationTarget>
                <DonationTarget>{infos[2]?.targetEth} ETH</DonationTarget>
              </DonationTop>
              <BottomBox>
                <DonationBottom>{infos[2]?.title}</DonationBottom>
                <RefundBtn>Refund</RefundBtn>
              </BottomBox>
            </DonationBox>
          </GridContainer>
        ) : null}
        {isModalOpenOne && (
          <ModalOverlay onClick={closeModalOne}>
            <form onSubmit={e => handleClick(e)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                {/* 모달 컨텐츠 */}
                <ModalTitle>{infos[0]?.title}</ModalTitle>
                <ModalInput
                  placeholder="Put ETH to donate"
                  required
                  value={amount}
                  onChange={e => setChange(e)}
                />
                {/* <ModalAmount>{amount}</ModalAmount> */}
                <ModalBtn type="submit">Donate</ModalBtn>
              </ModalContent>
            </form>
          </ModalOverlay>
        )}
        {isModalOpenTwo && (
          <ModalOverlay onClick={closeModalTwo}>
            <form onSubmit={e => handleClickTwo(e)}>
              <ModalContent onClick={e => e.stopPropagation()}>
                {/* 모달 컨텐츠 */}
                <ModalTitle>{infos[1]?.title}</ModalTitle>
                <ModalInput
                  placeholder="Put COL to donate"
                  required
                  value={amount}
                  onChange={e => setChange(e)}
                />
                {/* <ModalAmount>{amount}</ModalAmount> */}
                <ModalBtn type="submit">Donate</ModalBtn>
              </ModalContent>
            </form>
          </ModalOverlay>
        )}
        {isModalOpenThree && (
          <ModalOverlay onSubmit={e => handleClickThree(e)}>
            <ModalContent onClick={e => e.stopPropagation()}>
              {/* 모달 컨텐츠 */}
              <ModalTitle>Do you want to Refund your donation?</ModalTitle>

              <ModalBtn onClick={handleClickThree}>Refund</ModalBtn>
            </ModalContent>
          </ModalOverlay>
        )}
      </MiddleBox>
    </Layout>
  );
};

export default Donation;
