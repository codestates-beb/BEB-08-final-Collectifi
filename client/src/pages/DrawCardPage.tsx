import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DummyComponent, Layout} from '../Styles';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import axios from 'axios';

const Selected = styled.div`
  background: grey;
  font-size: 70px;
  padding: 15px;
  margin: 15px;
  width: 300px;
  height: 300px;
  justify-content: center;
`;

const Description = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 60px;
`;

const Amount = styled.div`
  width: 300px;
`;
const PackList = styled.div`
  display: flex;
  gap: 30px;
`;
const PackListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PackLabel = styled.div`
  font-size: 25px;
  margin: 5px;
  background: yellow;
  text-align: center;
  font-weight: 600;
  margin-bottom: 15px;
`;

const PackPrice = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

const Pack = styled.div`
  background: white;
  width: 300px;
  height: 500px;
  border-radius: 7%;
  /* border: 1px solid black; */
  color: black;
  text-align: center;
  box-shadow: 5px 5px 5px grey;
  &:hover {
    cursor: pointer;
    transform: translateY(-5px); /* 마우스를 올렸을 때 위로 이동 */
    transition: transform 0.5s ease; /* transition 속성 추가 */
  }
  margin-bottom: 20px;
`;

const DrawCardPage = () => {
  const [selectedPack, setSelectedPack] = useState(0);
  const [packAmount, setPackAmount] = useState(10);
  const balance = 10;
  // useEffect(()=>{

  // },[])

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (confirm('정말 구매하시겠습니까?')) {
      axios
        .post('http://localhost:8000/drawing', {card_pack: selectedPack}, {withCredentials: true})
        .then((res: any) => {
          console.log(res.data.data.mintedNft);
        });

      console.log('yes');
    } else {
      console.log('no');
    }
  };

  return (
    <Layout>
      <DummyComponent />
      {/* <Selected>{selectedPack}</Selected> */}
      <Description>Draw your favorite football player Card on NFT!</Description>

      <PackList>
        <PackListItem>
          <PackLabel>Normal Class</PackLabel>
          <Pack
            onClick={(e: any) => {
              setSelectedPack(0);
              setPackAmount(10);
              handleSubmit(e);
            }}
          ></Pack>
          <PackPrice>500 TKI</PackPrice>
        </PackListItem>
        <PackListItem>
          <PackLabel>High Class</PackLabel>
          <Pack
            onClick={() => {
              setSelectedPack(1);
              setPackAmount(25);
            }}
          ></Pack>
          <PackPrice>1000 TKI</PackPrice>
        </PackListItem>
        <PackListItem>
          <PackLabel>World Class</PackLabel>
          <Pack
            onClick={() => {
              setSelectedPack(2);
              setPackAmount(50);
            }}
          ></Pack>
          <PackPrice>5000 TKI</PackPrice>
        </PackListItem>
      </PackList>
      <DummyComponent />
    </Layout>
  );
};

export default DrawCardPage;
