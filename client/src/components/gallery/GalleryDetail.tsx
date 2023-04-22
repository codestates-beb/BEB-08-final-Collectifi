import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState, useRecoilRefresher_UNSTABLE } from 'recoil';
import { cardByGallIdQuery, getGallByIdQuery, addCardByGallIdQuery } from '../../modules/gallery/atom';
import { galleryDetail } from '../../modules/gallery/type';

import PageTitle from '../UI/PageTitle';
import Tab from '../UI/Tab';
import CardList from '../market/CardList';
import CardListItem from '../market/CardListItem';
import PlayerCard from '../UI/PlayerCard';
import BoardList from '../UI/BoardList';
import BoardListItemInfo from '../UI/BoardListItemInfo';
import GalleryRegi from './GalleryRegi';

const GalleryDetail = () => { 
  const { id } = useParams();
  const gallery = useRecoilValue(cardByGallIdQuery(Number(id)));
  const gallData = useRecoilValue(getGallByIdQuery(Number(id)));
  const galleryRefresh = useRecoilRefresher_UNSTABLE(cardByGallIdQuery(Number(id)));
  const addCardRefresh = useRecoilRefresher_UNSTABLE(addCardByGallIdQuery(Number(id)));
  useEffect(() => {
    return () => {
      galleryRefresh();
      addCardRefresh();
    }    
  }, []);

  if(!gallery) return <></>;
  const nftData = gallery.data.data.nfts;
  const filterdNftData = nftData.filter((nft: galleryDetail, index: number) => {
    return index === nftData.findIndex((n: galleryDetail) => n.nft_id === nft.nft_id);
  }); //nft_id 중복제거  
  //console.log(id, filterdNftData, gallData);

  const infoTitle = ["SUBJECT", "DESC", "END DATE"];
  const infoData = [gallData.tags, gallData.description, gallData.date];

  return (
    <GallDetailLayout>
      <PageTitle title={gallData.title}/>
      <section className='top'>
        <div className='banner'>
          <img src={gallData.img_url} alt='mainImg' />
        </div>
        <div>
          <BoardList>
            {infoData.map((el, i, arr) => {
              if(!el) return <></>;
              const listItem = [infoTitle[i], el];
              return (<BoardListItemInfo key={i} 
                listItem={listItem} 
                gridTemplateColumns='1fr 3fr'
                isLast={arr.length === i + 1}
                />)
            })}
          </BoardList>
        </div>
      </section>
      <Tab title={["GALLERY", "ADD MYCARD"]}>
        <CardList itemWidth={"250px"}>
          {filterdNftData.map((el: galleryDetail, i: number) => {
            return (
              <CardListItem 
                key={i}
                info={el.Nft.User.nickname}
                linkTo={`/market/${el.Nft.token_id}`} 
              >
                <PlayerCard 
                  imgSrc={el.Nft.img_url}
                  //cardWidth={cardWidth}
                  //glow={Glow.orange}
                />
              </CardListItem>
            )
          })}  
        </CardList>
        <GalleryRegi 
          gallId={Number(id)} 
          endDate={gallData.date} 
          addCardRefresh={addCardRefresh}
          galleryRefresh={galleryRefresh}
        />
      </Tab>      
    </GallDetailLayout>)
}

export default GalleryDetail;

const GallDetailLayout = styled.div`
  padding: 40px 20px 30px;
  max-width: 1140px;
  margin: 0 auto;

  & .top {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 60px;

    .item {
      white-space: pre-wrap;
      line-height: 1.3;
    }
  }
  
  & .banner {
    max-height: 320px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  @media only screen and (max-width: 768px) {
    & .top { 
      grid-template-columns: auto;
    }    
  }
`