import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {DummyComponent, Layout} from '../Styles';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import axios from 'axios';
import testImg from '../data/7-1.png';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const DrawLayout = styled(Layout)`
  height: 100%;
  max-width: 100%;
  /* width: 100%; */

  background: url('/stadium.jpg');
  background-size: cover;
`;
const NonOpacity = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
  margin: 15px;
  color: white;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 60px;
`;

const Amount = styled.div`
  width: 300px;
`;
const PackLayout = styled.div`
  margin-bottom: 20px;
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
  perspective: 600px;
`;

const PackLabel = styled.div`
  font-size: 25px;
  margin: 5px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 15px;
`;

const PackPrice = styled.div`
  font-size: 25px;
  font-weight: 600;
`;
const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;
interface Src {
  src: string;
}

const Pack = styled.div<Src>`
  background-size: cover;
  background-image: ${({src}) => `url(${src})`};
  /* background: #eaea04; */
  width: 260px;
  height: 370px;
  /* border-radius: 7%; */
  /* border: 1px solid black; */
  color: black;
  text-align: center;
  box-shadow: 5px 5px 5px grey;
  /* transform: rotateY(130deg); */
  /* transform: rotateZ(90deg); */
  /* transform-origin: left; */
  &:hover {
    cursor: pointer;
    /* transform: translateY(-5px); 
    transition: transform 0.5s ease; */
    animation: ${rotate} 3s linear infinite;
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
  margin-top: 50px;
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
          toast.success('Successfully Minted your Nft!🎉');
        });

      // 테스트용
      // setCard({
      //   token_id: 1,
      //   user_id: 1,
      //   player: 'Test',
      //   season: '2023',
      //   team: 'team1',
      //   card_color: 1,
      //   price: 5,
      //   selling_price: 10,
      //   img_url: '/7-1.png',
      //   isSell: false,
      // });
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
        <DrawLayout>
          {/* <Selected>{selectedPack}</Selected> */}
          <NonOpacity>
            <Description>Draw your favorite football player Card on NFT!</Description>
            {
              <PackLayout>
                <PackList>
                  <PackListItem>
                    <PackLabel>Normal Class</PackLabel>
                    <Pack
                      src={'/bronze-pack.png'}
                      onClick={(e: any) => {
                        handleSubmit(0);
                      }}
                    ></Pack>
                    <PackPrice>500 TKI</PackPrice>
                  </PackListItem>
                  <PackListItem>
                    <PackLabel>High Class</PackLabel>
                    <Pack
                      src={'/silver-pack.png'}
                      onClick={(e: any) => {
                        handleSubmit(1);
                      }}
                    ></Pack>
                    <PackPrice>1000 TKI</PackPrice>
                  </PackListItem>
                  <PackListItem>
                    <PackLabel>World Class</PackLabel>
                    <Pack
                      src={'/gold-pack.png'}
                      onClick={(e: any) => {
                        handleSubmit(2);
                      }}
                    ></Pack>
                    <PackPrice>5000 TKI</PackPrice>
                  </PackListItem>
                </PackList>
              </PackLayout>
            }
          </NonOpacity>
        </DrawLayout>
      )}
    </>
  );
};

export default DrawCardPage;
