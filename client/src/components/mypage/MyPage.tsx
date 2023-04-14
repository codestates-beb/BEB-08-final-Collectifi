import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { postListQuery, cardListQuery } from '../../modules/mypage/atom';

import { nft, post } from '../../modules/type';
import PageTitle from '../UI/PageTitle';
import Tab from '../UI/Tab';
import CardList from '../market/CardList';
import PlayerCard, { Glow } from '../UI/PlayerCard';
import CardListItem from '../market/CardListItem';
import BoardList from '../UI/BoardList';
import BoardTitleItem from '../UI/BoardTitleItem';
import BoardListItem from '../UI/BoardListItem';

const MyPage = () => {
  const cardList = useRecoilValue(cardListQuery);
  const postList = useRecoilValue(postListQuery);
  console.log(cardList, postList);
  const cardWidth = '250px';  

  return (
    <MyPageLayout>
      <PageTitle title="MY PAGE" />
      <Tab title={['MY CARD', 'MY POST', 'GET OFFER']}>
        <CardList itemWidth={cardWidth}>
          {cardList.map((el: nft, i: number) => {
            return (
              <CardListItem
                key={i}
                info={el.isSell ? 'FOR SAIL':undefined}
                linkTo={`/market/${el.token_id}`} 
              >
                <PlayerCard
                  imgSrc={el.img_url}
                  //cardWidth={cardWidth}
                  //glow={Glow.orange}
                />
              </CardListItem>
            );
          })}
        </CardList>
        <BoardList
          title={
            <BoardTitleItem
              title={['NO', 'TITLE', 'DATE', 'VIEW', 'LIKE']}
              gridTemplateColumns="1fr 3fr 1fr 1fr 1fr"
            />
          }
        >
          {postList.map((el: post, i: number) => {
            const date = new Date(el.created_at);
            const formattedDate = date.toLocaleDateString();
            const listItem = [el.id, el.title, formattedDate, el.views, el.likes];
            return (
              <BoardListItem
                key={i}
                listItem={listItem}
                gridTemplateColumns="1fr 3fr 1fr 1fr 1fr"
                linkTo={`/community/detail/${el.id}`}
              />
            );
          })}
        </BoardList>
        <BoardList
          title={
            <BoardTitleItem
              title={['OFFER1', 'OFFER2', 'OFFER3', 'OFFER4', 'OFFER5']}
              gridTemplateColumns="1fr 2fr 2fr 1fr 1fr"
            />
          }
        >
          {new Array(10).fill(0).map((el, i) => {
            const listItem = ['test1', 'test2', 'test3', 'test4', 'test5'];
            return (
              <BoardListItem
                key={i}
                listItem={listItem}
                gridTemplateColumns="1fr 2fr 2fr 1fr 1fr"
                linkTo={`${i}`}
              />
            );
          })}
        </BoardList>
      </Tab>
    </MyPageLayout>
  );
};

export default MyPage;

const MyPageLayout = styled.div`
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
`;
