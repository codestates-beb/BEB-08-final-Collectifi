import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DummyComponent, Layout} from '../Styles';
import Button from '../components/UI/Button';

const Selected = styled.div`
  background: grey;
  font-size: 70px;
  padding: 15px;
  margin: 15px;
  width: 300px;
  height: 300px;
  justify-content: center;
`;
const Amount = styled.div`
  width: 300px;
`;
const PackList = styled.div`
  display: flex;
  gap: 30px;
`;
const PackListItem = styled.div`
  justify-content: center;
  align-items: center;
`;

const PackLabel = styled.div`
  margin: 5px;
  background: yellow;
  text-align: center;
`;

const Pack = styled.div`
  background: white;
  width: 180px;
  height: 220px;
  border-radius: 10%;
  /* border: 1px solid black; */
  color: black;
  text-align: center;
  box-shadow: 5px 5px 5px grey;
  &:hover {
    transform: translateY(-5px); /* 마우스를 올렸을 때 위로 이동 */
    transition: transform 0.5s ease; /* transition 속성 추가 */
  }
`;

const DrawCardPage = () => {
  const [selectedPack, setSelectedPack] = useState('Basic');
  const [packAmount, setPackAmount] = useState(10);
  const balance = 10;
  // useEffect(()=>{

  // },[])

  return (
    <Layout>
      <DummyComponent />
      {/* <Selected>{selectedPack}</Selected> */}
      <Amount>
        보유: {balance} {balance >= packAmount ? '' : `You don't have enough`}
      </Amount>
      <Button>My Card</Button>
      <PackList>
        <PackListItem>
          <PackLabel>Basic</PackLabel>
          <Pack
            onClick={() => {
              setSelectedPack('Basic');
              setPackAmount(10);
            }}
          >
            <div>Pack</div>
            <div>10 ETH</div>
          </Pack>
        </PackListItem>
        <PackListItem>
          <PackLabel>Standard</PackLabel>
          <Pack
            onClick={() => {
              setSelectedPack('Standard');
              setPackAmount(25);
            }}
          >
            <div>Pack</div>
            <div>25 ETH</div>
          </Pack>
        </PackListItem>
        <PackListItem>
          <PackLabel>World Class</PackLabel>
          <Pack
            onClick={() => {
              setSelectedPack('World Class');
              setPackAmount(50);
            }}
          >
            <div>Pack</div>
            <div>50 ETH</div>
          </Pack>
        </PackListItem>
      </PackList>
      <DummyComponent />
    </Layout>
  );
};

export default DrawCardPage;
