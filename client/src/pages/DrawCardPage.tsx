import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DummyComponent, Layout} from '../Styles';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import axios from 'axios';
import testImg from '../data/7-1.png';
import {useNavigate} from 'react-router-dom';

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

export const CardContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.1);

  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardComment = styled.div`
  font-size: 60px;
  font-weight: 600;
  opacity: 1;
`;

const Card = styled.img`
  width: 500px;
  height: 700px;
  z-index: 1;
  opacity: 1;
`;

interface CardAttributes {
  token_id: number;
  user_id: number;
  player: string;
  season: string;
  team: string;
  card_color: number;
  price: number;
  selling_price: number;
  img_url: string;
  isSell: boolean;
}

type PackAttributes = number;

const DrawCardPage = () => {
  const [selectedPack, setSelectedPack] = useState<PackAttributes>(0);
  const navigate = useNavigate();

  const [card, setCard] = useState<CardAttributes>();
  const handleButtonClick = () => {
    navigate('/');
  };

  useEffect(() => {
    console.log('He');
  }, [card]);

  const handleSubmit = async (e: any) => {
    console.log(e);
    setSelectedPack(e);
    console.log(selectedPack);

    if (confirm('정말 구매하시겠습니까?')) {
      axios
        .post('http://localhost:8000/drawing', {card_pack: e}, {withCredentials: true})
        .then((res: any) => {
          setCard(res.data.data.mintedNft);
        });

      console.log('yes');
    } else {
      console.log('no');
    }
  };

  return (
    <>
      {card ? (
        <CardContainer>
          <CardComment>Congratulations!!!</CardComment>
          <Card src={card.img_url} />
          <button onClick={handleButtonClick}>Check on MyPage</button>
        </CardContainer>
      ) : (
        <Layout>
          <DummyComponent />
          {/* <Selected>{selectedPack}</Selected> */}
          <Description>Draw your favorite football player Card on NFT!</Description>
          {
            <>
              <PackList>
                <PackListItem>
                  <PackLabel>Normal Class</PackLabel>
                  <Pack
                    onClick={(e: any) => {
                      handleSubmit(0);
                    }}
                  ></Pack>
                  <PackPrice>500 TKI</PackPrice>
                </PackListItem>
                <PackListItem>
                  <PackLabel>High Class</PackLabel>
                  <Pack
                    onClick={(e: any) => {
                      handleSubmit(1);
                    }}
                  ></Pack>
                  <PackPrice>1000 TKI</PackPrice>
                </PackListItem>
                <PackListItem>
                  <PackLabel>World Class</PackLabel>
                  <Pack
                    onClick={(e: any) => {
                      handleSubmit(2);
                    }}
                  ></Pack>
                  <PackPrice>5000 TKI</PackPrice>
                  {selectedPack}
                </PackListItem>
              </PackList>
            </>
          }
          <DummyComponent />
        </Layout>
      )}
    </>
  );
};

export default DrawCardPage;
