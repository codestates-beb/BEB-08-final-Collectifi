import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';

interface StyledDivProps {
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
  perspective: 100px;
  transition: transform 1s;
  &:hover {
    cursor: pointer;
    transform: translateZ(20px);
  }
`;
const MyCardsContainer = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;

  height: 250px;
  margin: auto;
  position: relative;
  width: 90%;
  display: grid;
  place-items: center;
`;
const move = keyframes`
0% {
    transform: translateX(0);
} 100% {
    transform: translateX(calc(-250px * 9));
}
`;
const SliderTrack = styled.div`
  display: flex;
  width: calc(250px * 18);
  animation: ${move} 40% linear infinite;
`;

const SliderTest2 = () => {
  const [myCards, setMyCards] = useState<Card[]>([]);
  const [target, setTarget] = useState<Card | null>();

  useEffect(() => {
    axios.get('http://localhost:8000/upgrade', {withCredentials: true}).then((res: any) => {
      setMyCards(res.data.data.nfts);
      //   setMyTokens(res.data.data.token_amount);
      console.log(res.data.data);
    });

    console.log('hi');
  }, []);

  return (
    <MyCardsContainer>
      <SliderTrack>
        {myCards
          ? myCards.map(card => (
              <React.Fragment key={card.token_id}>
                <Card onClick={() => setTarget(card)} bgImage={card.img_url}></Card>
              </React.Fragment>
            ))
          : null}
      </SliderTrack>
    </MyCardsContainer>
    // <div className="slider">
    //   <div className="slide-track">
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //     <div className="slide">
    //       <img src="" />
    //     </div>
    //   </div>
    // </div>
  );
};

export default SliderTest2;
