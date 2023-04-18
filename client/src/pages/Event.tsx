import React, {useState} from 'react';
import {Layout} from '../Styles';
import {TabButton, TabLi, TabUl} from './CommunityPage';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faSearch} from '@fortawesome/free-solid-svg-icons';

export const TopBox = styled.div`
  width: 100%;

  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const TopTitle = styled.div`
  font-size: 45px;
  font-weight: 600;
`;

export const TopSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const Input = styled.input`
  width: 180px;
  height: 40px;
  margin-left: 20px;
  padding: 10px;
  border: 1px solid black;
`;

export const SearchBtn = styled.div`
  :hover {
    cursor: pointer;
  }
  background-color: #333333;

  display: flex;
  color: white;
  font-weight: 400;
  height: 100%;
  font-size: 38px;
`;

export const MiddleBox = styled.div`
  width: 100%;
  /* background-color: gray; */
  /* height: 110px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-bottom: 25px;
`;

export const TabBox = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

export const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  font-size: 32px;
  border: 1px solid rgba(0, 0, 0, 3);

  :hover {
    cursor: pointer;
  }
`;

export const EventBox = styled.div`
  border-radius: 10px;
  display: flex;
  width: 100%;
  /* background-color: blue; */
  margin-top: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const EventImg = styled.div<{bgImage: string}>`
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 200px;
  border: 1px solid black;
  background-image: ${({bgImage}) => `url(${bgImage})`};
`;

export const EventInfo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const EventTitle = styled.div`
  font-size: 22px;
`;

export const EventDate = styled.div``;

export const EventText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
`;

export const EventState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  width: 75px;
  height: 75px;
  border-radius: 75px;
  background-color: #fd115c;

  color: white;
`;

const Event = () => {
  const [tab, setTab] = useState(0);

  return (
    <Layout>
      <TopBox>
        <TopTitle>Events</TopTitle>
        <TopSearchBar>
          <div>Total : 4 </div>
          <Input placeholder="Search..." />
          <SearchBtn>
            <div>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </SearchBtn>
        </TopSearchBar>
      </TopBox>
      <MiddleBox>
        <TabBox>
          <Tab>Event</Tab>
          <Tab>Announce</Tab>
        </TabBox>
        <EventBox>
          <EventImg bgImage={'https://i.ytimg.com/vi/Owohimf9Dk4/maxresdefault.jpg'}></EventImg>
          <EventInfo>
            <EventText>
              <EventTitle>Dubai Al-Haim Stadium Opening Events</EventTitle>
              <EventDate>2023-04-19 ~ 2023-04-30</EventDate>
            </EventText>
            <EventState>Going</EventState>
          </EventInfo>
        </EventBox>
        <EventBox>
          <EventImg
            bgImage={
              'https://phantom-marca.unidadeditorial.es/74091d9666ebf6332446a5f67ff14295/resize/1320/f/jpg/assets/multimedia/imagenes/2021/08/06/16282527979871.jpg'
            }
          ></EventImg>
          <EventInfo>
            <EventText>
              <EventTitle>Support PSG and draw the Free tickets! </EventTitle>
              <EventDate>2023-04-17 ~ 2023-05-16</EventDate>
            </EventText>
            <EventState>Going</EventState>
          </EventInfo>
        </EventBox>
        <EventBox>
          <EventImg
            bgImage={
              'https://cdnuploads.aa.com.tr/uploads/Contents/2022/09/12/thumbs_b_c_f81ad7c34d2aa803757476cf1bee7477.jpg?v=152534'
            }
          ></EventImg>
          <EventInfo>
            <EventText>
              <EventTitle>Who will be the Top scorer this Month?</EventTitle>
              <EventDate>2023-03-12 ~ 2023-04-27</EventDate>
            </EventText>
            <EventState>Going</EventState>
          </EventInfo>
        </EventBox>
        <EventBox>
          <EventImg
            bgImage={
              'https://e0.365dm.com/22/10/1600x900/skysports-real-madrid-barcelona_5929388.jpg?20221013114052'
            }
          ></EventImg>
          <EventInfo>
            <EventText>
              <EventTitle>Pick the Player of the Month in La Liga</EventTitle>
              <EventDate>2023-02-19 ~ 2023-05-10</EventDate>
            </EventText>
            <EventState>Going</EventState>
          </EventInfo>
        </EventBox>
      </MiddleBox>
    </Layout>
  );
};

export default Event;
