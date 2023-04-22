import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { addCardByGallIdQuery } from '../../modules/gallery/atom';
import { addCard } from '../../modules/gallery/type';

import CardList from '../market/CardList';
import CardListItem from '../market/CardListItem';
import PlayerCard from '../UI/PlayerCard';
import RegiCont from './RegiCont';

type Props = {
  gallId: number;
  endDate: string;
  galleryRefresh: () => void;
  addCardRefresh: () => void;
}

const GalleryRegi: React.FC<Props> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);  
  const [selectedTokenId, setSelectedTokenId] = useState(0); 
  const addCard = useRecoilValue(addCardByGallIdQuery(props.gallId));  
  
  console.log("addCard", addCard)

  const handleCardClick = (index: number, token_id: number) => {
    setSelectedIndex(index);
    setSelectedTokenId(token_id);
  }

  if(!addCard) return <></>;
  const addCardData = addCard.data.data.myNfts;

  return (
    <GalleryRegiLayout>      
      <div>
        <CardList itemWidth={"200px"}>
          {addCardData.map((el: addCard, i: number) => {
            return (
              <CardListItem 
                key={i}
                onClick={() => handleCardClick(i, el.token_id)}
                isSelected={i === selectedIndex}
                isPreventDefault={true}
              >
                <PlayerCard 
                  imgSrc={el.img_url}
                  //cardWidth={cardWidth}
                  //glow={Glow.orange}
                />
              </CardListItem>
            )
          })}  
        </CardList>
      </div>
      <div className='RegiForm'>
        <RegiCont 
          gallId={props.gallId}
          selectedTokenId={selectedTokenId} 
          endDate={props.endDate}
          addCardRefresh={props.addCardRefresh}
          galleryRefresh={props.galleryRefresh}
        />
      </div>
    </GalleryRegiLayout>)
}

export default GalleryRegi;

const GalleryRegiLayout = styled.div`
  //padding: 40px 20px 30px;
  max-width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 40px;
`