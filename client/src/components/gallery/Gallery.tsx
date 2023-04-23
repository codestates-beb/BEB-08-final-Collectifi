import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedGallery, galleriesQuery } from '../../modules/gallery/atom';
import { gallery } from '../../modules/gallery/type';

import PageTitle from '../UI/PageTitle';
import BoardList from '../UI/BoardList';
import BoardTitleItem from '../UI/BoardTitleItem';
import BoardListItem from '../UI/BoardListItem';

const Gallery = () => {
  const galleries = useRecoilValue(galleriesQuery);
  const setSelectedGallery = useSetRecoilState(selectedGallery);

  const handleClick = (index: number) => {
    if(!galleries) return;
    const gallData = galleries.data.data.gallerys[index];
    setSelectedGallery(gallData);
  }

  useEffect(() => {
    return () => {
      //
    }    
  }, []);

  if(!galleries) return <></>
  const gallData = galleries.data.data.gallerys;
  console.log("gal", galleries);
  return (
    <GalleryLayout>
      <PageTitle title='GALLERY'/>
      <BoardList
        key={2}
        title={
          <BoardTitleItem
            title={['', 'SUBJECT', 'TITLE', 'END DATE']}
            gridTemplateColumns="2fr 2fr 3fr 1fr"
          />
        }
      >
        {gallData.map((el: gallery, i: number) => {
          const img = <div className='gallimg-wrap'><img src={el.img_url} alt='gallery'/></div>
          const listItem = [img, el.tags, el.title, el.date];
          return (
            <BoardListItem
              key={i}
              listItem={listItem}
              gridTemplateColumns="2fr 2fr 3fr 1fr"
              linkTo={`${el.id}`}
              onClick={() => handleClick(i)}
            />
          );
        })}
      </BoardList>
    </GalleryLayout>)
}

export default Gallery;

const GalleryLayout = styled.div`
  padding: 40px 20px 30px;
  max-width: 1140px;
  margin: 0 auto;

  & .gallimg-wrap {
    overflow: hidden;
    max-height: 140px;
    img {
      width: 100%;
    }   
  }
`