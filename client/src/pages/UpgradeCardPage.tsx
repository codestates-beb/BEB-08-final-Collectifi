import styled, {keyframes} from 'styled-components';
import Confetti from '../components/UI/Confetti';

import CardListItem from '../components/market/CardListItem';

import {Layout} from '../Styles';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import {toast} from 'react-toastify';
import Button from '../components/UI/Button';
import {userId} from '../modules/atom';
import {useRecoilValue} from 'recoil';
const AppContainer = styled.div`
  background-color: #000;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

const NeonBox = styled.div<{shadow: string; border: string}>`
  border: 5px solid ${({border}) => border};

  box-shadow: ${({shadow}) => shadow};
  transition: all 1s ease-in-out;
`;

const chargeAnimation = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
`;

// const LightningCharge = styled<{ text: string }>`
//   font-size: 6rem;
//   color: ${({ text }) => text};
//   transition: all 1s ease-in-out;
//   animation: ${chargeAnimation} 1s alternate infinite;
// `;

const Title = styled.div`
  margin: 25px 0px;
  font-size: 60px;
  font-weight: 600;
`;

const TargetCard = styled(NeonBox)`
  display: flex;
  justify-content: center;
  /* background: yellow; */
  width: 700px;
  margin: 10px;
  padding: 10px;
  gap: 10px;
  box-shadow: 5px 5px 5px 5px gray;
`;
const CardInfo = styled.div`
  padding: 10px;
  margin: 10px;
`;

const MyCardsContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
`;

export interface StyledDivProps {
  bgImage: string;
  // 다른 props 추가 가능
}
interface Card {
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

const Card = styled.div<StyledDivProps>`
  background-image: ${({bgImage}) => `url(${bgImage})`};
  background-position: center;
  background-size: cover;
  width: 320px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`;

const MyCardsText = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin: 30px 30px;
`;

const UpgradeText = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 15px;
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

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const FloatingDiv = styled.div`
  position: relative;
  animation-name: ${floatAnimation};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const UpgradeCardPage = () => {
  const [myCards, setMyCards] = useState<Card[]>([]);
  const [myTokens, setMyTokens] = useState('');
  const [target, setTarget] = useState<Card | null>();
  const [upgradeCard, setUpgradeCard] = useState<Card>();
  const totalCards = myCards.length - 1;
  const currId = useRecoilValue(userId);
  useEffect(() => {
    axios.get('http://localhost:8000/upgrade', {withCredentials: true}).then((res: any) => {
      setMyCards(res.data.data.nfts);
      setMyTokens(res.data.data.token_amount);
      console.log('get upgrade: ', res.data.data);
    });

    console.log('hi');
  }, []);

  const handleUpgrade = async (e: Event) => {
    e.preventDefault();
    if (confirm('정말 강화 하시겠습니까?')) {
      axios
        .post('http://localhost:8000/upgrade', {nft: target}, {withCredentials: true})
        .then((res: any) => {
          if (res.data.message === '성공했습니다.') {
            console.log('upgrade res: ', res);
            setUpgradeCard(res.data.data.mintedNft);
            toast.success('You have successfully upgraded your card!');
          } else {
            toast.info('You failed to upgrade your card. 🛠');
          }
        })
        .catch(err => {
          console.log('upgrade error: ', err);
        });

      console.log('yes');
    } else {
      console.log('no');
    }
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/user/${currId}`);
  };

  const [index, setIndex] = useState(0);
  const neonTypeColors = [
    {
      shadow: '0 0 10px #ff1be6, 0 0 20px #ff1be6, 0 0 30px #ff1be6',
      border: '#ff1be6',
      text: '#ff1be6',
    },
    {
      shadow: '0 0 10px #1bcaff, 0 0 20px #1bcaff, 0 0 30px #1bcaff',
      border: '#1bcaff',
      text: '#1bcaff',
    },
    {
      shadow: '0 0 10px #fffc00, 0 0 20px #fffc00, 0 0 30px #fffc00',
      border: '#fffc00',
      text: '#fffc00',
    },
    {
      shadow: '0 0 10px #1bcaff, 0 0 20px #ff1be6, 0 0 30px #fffc00',
      border: '#ff1be6',
      text: '#fffc00',
    },
  ];

  useEffect(() => {
    const loop = setInterval(() => {
      if (index >= 3) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2000);
    return () => {
      clearInterval(loop);
    };
  }, [index]);

  const {shadow, text, border} = neonTypeColors[index];

  return (
    <>
      {upgradeCard ? (
        <CardContainer>
          <CardComment>Congratulations!!!</CardComment>
          <Card bgImage={upgradeCard.img_url} />
          <Button onClick={handleButtonClick}>Check on MyPage</Button>
          {/* <button>Check on MyPage</button> */}
        </CardContainer>
      ) : (
        <div>
          <Layout>
            <Title>Upgrade Your Card</Title>

            <TargetCard shadow={shadow} border={border}>
              <CardListItem>
                <FloatingDiv>
                  <Card bgImage={target ? target.img_url : ''}></Card>
                </FloatingDiv>
              </CardListItem>
              <CardInfo>
                <UpgradeText>
                  강화 비용:{' '}
                  {target && target.card_color == 0
                    ? '150 '
                    : target && target.card_color == 1
                    ? '300 '
                    : '????'}
                  COL
                </UpgradeText>
                <UpgradeText>보유 COL: {myTokens}</UpgradeText>

                <Button
                  onClick={(e: any) => {
                    handleUpgrade(e);
                  }}
                >
                  강화하기
                </Button>
                {/* <Confetti innerText={'성공'} /> */}
              </CardInfo>
            </TargetCard>
          </Layout>

          <MyCardsText>My Cards</MyCardsText>
          <MyCardsContainer>
            {myCards
              ? myCards.map(card => (
                  <React.Fragment key={card.token_id}>
                    <Card onClick={() => setTarget(card)} bgImage={card.img_url}></Card>
                  </React.Fragment>
                ))
              : null}
          </MyCardsContainer>
        </div>
      )}
    </>
  );
};

export default UpgradeCardPage;

// type Props = {
//   itemWidth: string;
// }

// const CardListLayout = styled.ul<Props>`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(${props => props.itemWidth}, auto));
//   gap: 20px;`
