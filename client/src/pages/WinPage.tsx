import React, {useEffect, useState} from 'react';
import {DummyComponent} from '../Styles';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Timer from './Timer';
import PageTitle from '../components/UI/PageTitle';

const WinLayout = styled.div`
  // margin-top: 150px;
  // max-width: 70%;
  padding: 40px 20px 30px;
  max-width: 1140px;
  margin: 0 auto;
  @media only screen and (max-width: 1024px) {
    max-width: 93%;
  }
  /* background-color: beige; */
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BigBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);

  //margin-top: 50px;
  height: 350px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MatchDate = styled.div`
  /* background-color: bisque; */
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const MatchInfo = styled.div`
  font-size: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TeamLogo = styled.div<{bgImage: string}>`
  background-color: white;
  height: 150px;
  width: 150px;
  background-image: ${({bgImage}) => `url(${bgImage})`};
  background-position: center;
  background-size: cover;
`;

const Bar = styled.div`
  /* background-color: brown; */
  padding: 20px 20px;
  width: 70%;
  height: 100%;
  display: flex;
`;

const HomeAway = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BetForm = styled.form`
  display: flex;
  width: 50%;
  height: 70px;
  /* background-color: blueviolet; */
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 18px;
  &::placeholder {
    font-size: 18px;
  }
`;

const Button = styled.button`
  width: 80px;
  height: 50px;
`;

const HomeAwayInfo = styled.div``;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid black;
  height: 50px;
`;

const Option = styled.option``;

interface Ratios {
  winRate: number;
  drawRate: number;
  loseRate: number;
}

interface Dividend {
  winDiainage: number;
  drawDiainage: number;
  loseDiainage: number;
}

interface BarSegmentProps {
  width: number;
  color: string;
}

const BarSegment = styled.div<BarSegmentProps>`
  color: white;
  font-size: 25px;
  font-weight: 600;
  width: ${props => `${props.width}%`};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => `${props.color}`};
`;

const WinPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [ratios, setRatios] = useState<Ratios>();
  const [dividend, setDividend] = useState<Dividend>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/game/fund', {withCredentials: true});
      const {drawToken, winToken, loseToken, totalToken, winDiainage, drawDiainage, loseDiainage} =
        response.data.data;
      const winRate = (winToken / totalToken) * 100;
      const drawRate = (drawToken / totalToken) * 100;
      const loseRate = (loseToken / totalToken) * 100;
      setRatios({winRate, drawRate, loseRate});
      setDividend({winDiainage, drawDiainage, loseDiainage});
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // 폼 제출 처리
    console.log('베팅 정보:', selectedOption, betAmount);
    if (confirm(`Home팀 ${selectedOption}에 ${betAmount} COL 베팅하시겠습니까?`)) {
      console.log('성공');
      const response = await axios.post(
        'http://localhost:8000/game/fund',
        {game: selectedOption, value: betAmount},
        {withCredentials: true},
      );
      if (response.status == 200) {
        // alert('베팅에 성공했습니다!');
        toast.success('You made a bet successfully!');
        navigate('/win');
      }
    } else {
      console.log('취소');
    }
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleBetAmountChange = (event: any) => {
    setBetAmount(event.target.value);
  };

  return (
    <WinLayout>
      <PageTitle title='BET ON MATCHS'/>
      <BigBox>
        <MatchDate>29th April</MatchDate>
        <Timer />
        <HomeAway>
          <HomeAwayInfo>Home</HomeAwayInfo>
          <HomeAwayInfo>Away</HomeAwayInfo>
        </HomeAway>
        <MatchInfo>
          <TeamLogo
            bgImage={'https://1000logos.net/wp-content/uploads/2018/06/Tottenham_Hotspur_Logo.png'}
          ></TeamLogo>
          <Bar>
            <BarSegment width={ratios ? ratios.winRate : 0} color="#F07420">
              {dividend?.winDiainage}
            </BarSegment>
            <BarSegment width={ratios ? ratios.drawRate : 0} color="#977CF3">
              {dividend?.drawDiainage}
            </BarSegment>
            <BarSegment width={ratios ? ratios.loseRate : 0} color="#25CDC0">
              {dividend?.loseDiainage}
            </BarSegment>
          </Bar>
          <TeamLogo
            bgImage={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc0cadfK2q-xdBJth0t-IDxSn-oqVq1Zjpd4jIFuACXJvzBuu6cEz_e4FLwtp6KGKzt_Q&usqp=CAU'
            }
          ></TeamLogo>
        </MatchInfo>
        <BetForm onSubmit={handleSubmit}>
          <Select value={selectedOption} onChange={handleOptionChange}>
            <Option value="">선택하세요.</Option>
            <Option value="win">Home 승</Option>
            <Option value="draw">무승부</Option>
            <Option value="lose">Home 패</Option>
          </Select>{' '}
          <Input placeholder="100 단위 COL로 베팅하세요" onChange={handleBetAmountChange} />
          <Button type="submit">Bet</Button>
        </BetForm>
      </BigBox>
      <BigBox>
        <MatchDate>30th April</MatchDate>
        <HomeAway>
          <HomeAwayInfo>Home</HomeAwayInfo>
          <HomeAwayInfo>Away</HomeAwayInfo>
        </HomeAway>
        <MatchInfo>
          <TeamLogo
            bgImage={'https://logowik.com/content/uploads/images/545_realmadridfc.jpg'}
          ></TeamLogo>
          <Bar>
            <BarSegment width={60} color="#F07420">
              {1.66}
            </BarSegment>
            <BarSegment width={25} color="#977CF3">
              {4}
            </BarSegment>
            <BarSegment width={15} color="#25CDC0">
              {6.66}
            </BarSegment>
          </Bar>
          <TeamLogo
            bgImage={
              'https://logos-world.net/wp-content/uploads/2020/06/Atletico-Madrid-Logo-2017-Present.jpg'
            }
          ></TeamLogo>
        </MatchInfo>
        <BetForm>
          <Select>
            <Option value="">선택하세요.</Option>
            <Option value="win">Home 승</Option>
            <Option value="draw">무승부</Option>
            <Option value="lose">Home 패</Option>
          </Select>{' '}
          <Input placeholder="100 단위 COL로 베팅하세요" />
          <Button type="submit">Bet</Button>
        </BetForm>
      </BigBox>
      <BigBox>
        <MatchDate>5월 4일 (예정)</MatchDate>
        <HomeAway>
          <HomeAwayInfo>Home</HomeAwayInfo>
          <HomeAwayInfo>Away</HomeAwayInfo>
        </HomeAway>
        <MatchInfo>
          <TeamLogo
            bgImage={
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SSC_Napoli_%28Gradient%29.svg/1200px-SSC_Napoli_%28Gradient%29.svg.png'
            }
          ></TeamLogo>
          <Bar>
            <BarSegment width={50} color="#F07420">
              {1.0}
            </BarSegment>

            <BarSegment width={50} color="#25CDC0">
              {1.0}
            </BarSegment>
          </Bar>
          <TeamLogo
            bgImage={
              'data:image/png;base64,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'
            }
          ></TeamLogo>
        </MatchInfo>
      </BigBox>
    </WinLayout>
  );
};

export default WinPage;
