import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState, useRecoilRefresher_UNSTABLE, useRecoilCallback } from 'recoil';
import { currentUserId, getUserQuery, getCardListQuery, getPostListQuery, galleryInfoQuery, withdrawQuery, updateWithdrawQuery } from '../../modules/mypage/atom';
import { userNickname, userAmount, userAddr, userId } from '../../modules/atom';
import { updateWithdraw } from '../../modules/mypage/api';
import { sendTx } from '../../modules/wallet';
import { nft, post } from '../../modules/type';
import { myGallery, myCard } from '../../modules/mypage/type';
import PageTitle from '../UI/PageTitle';
import Tab from '../UI/Tab';
import CardList from '../market/CardList';
import PlayerCard, { Glow } from '../UI/PlayerCard';
import CardListItem from '../market/CardListItem';
import BoardList from '../UI/BoardList';
import BoardTitleItem from '../UI/BoardTitleItem';
import BoardListItem from '../UI/BoardListItem';
import BoardListItemInfo from '../UI/BoardListItemInfo';
import ModalAlert from '../UI/ModalAlert';
import EditInfo from './EditInfo';


const MyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  //recoil
  const userAddress = useRecoilValue(userAddr);
  const nickname = useRecoilValue(userNickname);
  const setCurrId = useSetRecoilState(currentUserId);
  const [amount, setAmount] = useRecoilState(userAmount);
  const userInfo = useRecoilValue(getUserQuery);
  const cardList = useRecoilValue(getCardListQuery);
  const postList = useRecoilValue(getPostListQuery);
  const gallInfo = useRecoilValue(galleryInfoQuery(Number(id)));
  //refresh
  const userRefresh = useRecoilRefresher_UNSTABLE(getUserQuery); 
  const cardRefresh = useRecoilRefresher_UNSTABLE(getCardListQuery);
  const postRefresh = useRecoilRefresher_UNSTABLE(getPostListQuery);
  const galRefresh = useRecoilRefresher_UNSTABLE(galleryInfoQuery(Number(id)));
  //modal 변수
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const openModal = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setIsOpen(true);
  }

  const handleModalClick = () => {
    setIsOpen(false);
  }

  const handleGallClick = useRecoilCallback(({ snapshot }) => async (gallId: number, tokenId: number, endTime: Date, now: Date) => {  
    //console.log(endTime < now);
    if(endTime > now) {
      navigate(`/gallery/${gallId}`);
      return;
    }
    if(!userInfo) return;
    if(!userInfo.isOwner) return;      
    //withdraw
    const withdrawQ = await snapshot.getPromise(withdrawQuery(tokenId));
    console.log(withdrawQ);
    if(!withdrawQ) {
      openModal("카드반환 실패", "데이터 요청에 실패했어요.")
      return;
    }
    const withdrawData = withdrawQ.data.data;
    const withdrawResult = await sendTx(userAddress, withdrawData.gallca, withdrawData.withdraw);
    console.log(withdrawResult);
    if(!withdrawResult) { 
      openModal("카드반환 실패", "카드반환에 실패했어요.")
      return;
    }   
    //db업데이트
    const updateResult = await updateWithdraw(gallId, tokenId);
    console.log(updateResult);
    if(!updateResult) {
      openModal("카드반환 실패", "카드반환 내역 저장에 실패했어요.")
      return;
    }
    galRefresh();
    cardRefresh();
    openModal("카드반환 성공", "카드반환에 성공 했어요.");          
  });

  useEffect(() => {
    if(id) 
      setCurrId(parseInt(id));      
    if(userInfo && userInfo.user.token_amount) 
      setAmount(userInfo.user.token_amount);
    return () => {
      userRefresh();
      cardRefresh();
      postRefresh();
      galRefresh();
    }   
  }, [id]);

  console.log(userInfo, cardList, postList, gallInfo?.data.data.nfts);
  if(!userInfo || !cardList || !postList || !gallInfo) return <></>  
  const gallList = gallInfo.data.data.nfts;
  const cardWidth = '250px'; 

  const infoTitle = ["ADDRESS", "TOKEN AMOUNT", "NICKNAME"];
  const infoData = [userInfo.user.address.slice(0, 10), 
    userInfo.isOwner ? amount : userInfo.user.token_amount, 
    userInfo.isOwner ? nickname : userInfo.user.nickname,
  ];

  return (
    <MyPageLayout>      
      {isOpen && (
        <ModalAlert
          title={title}
          message={message}
          onConfirm={handleModalClick}
        />
      )}
      <PageTitle title={userInfo.isOwner ? 'MY PAGE' : `${userInfo.user.nickname}'s PAGE`} />
      <div className='top'>
        <BoardList>
          {infoData.map((el, i, arr) => {
            if(!el) return <></>;
            const listItem = [infoTitle[i], el];
            return (<BoardListItemInfo key={i} 
              listItem={listItem} 
              gridTemplateColumns='1fr 1fr'
              isLast={arr.length === i + 1}
              />)
          })}
        </BoardList>        
      </div>  
      {userInfo.isOwner && <div className='edit-wrap'>
        <EditInfo />
      </div>}    
      <Tab className='tab' title={[userInfo.isOwner ? 'MY CARD' : 'CARD',
        userInfo.isOwner ? 'MY POST' : 'POST',
        userInfo.isOwner ? 'MY GALLERY' : 'GALLERY',]}
        //userInfo.isOwner && 'GET OFFER']}
      >
        <CardList itemWidth={cardWidth} key={0}>
          {cardList.map((el: myCard, i: number) => {
            let info = undefined;
            if(el.isSell) info = 'FOR SALE';
            else if(el.Nft_galleries.length > 0) 
              info = 'ON DISPLAY'
            return (
              <CardListItem
                key={i}
                info={info}
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
          key={1}
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
          key={2}
          title={
            <BoardTitleItem
              title={['GALLERY', 'SUBJECT', 'TITLE', 'GALL END', 'CARD', 'STAKE END']}
              gridTemplateColumns="4fr 5fr 6fr 3fr 2fr 3fr"
            />
          }
        >
          {gallList.map((el: myGallery, i: number) => {
            //withdraw 가능 날짜설정
            const gallEndTime = new Date(el.Nft_galleries[0].Gallery.date);
            const endTime = new Date(el.Nft_galleries[0].nft_end_time);
            const now = new Date();
            //console.log(i, gallEndTime, endTime < now, gallEndTime < now);
            //stake end date 날짜설정
            const formattedEndTime = endTime.toLocaleDateString();   
            const formattedGallEndTime = gallEndTime.toLocaleDateString();
            //
            const galEl = el.Nft_galleries[0].Gallery;
            const pCard = <div className='player-wrap'><PlayerCard imgSrc={el.img_url} /></div>
            const gallImg = <div className='gallimg-wrap'><img src={galEl.img_url} alt='gallery'/></div>
            const listItem = [gallImg, galEl.tags, galEl.title, formattedGallEndTime, pCard, formattedEndTime];
            return (
              <BoardListItem
                key={i}
                listItem={listItem}
                gridTemplateColumns="4fr 5fr 6fr 3fr 2fr 3fr"
                onClick={() => handleGallClick(galEl.id, el.token_id, endTime, now)}
                isPreventDefault={true}
                isSelected={endTime < now}
              />
            );
          })}
        </BoardList>
        {userInfo.isOwner && <BoardList
          key={3}
          title={
            <BoardTitleItem
              title={['OFFER1', 'OFFER2', 'OFFER3', 'OFFER4', 'OFFER5']}
              gridTemplateColumns="1fr 2fr 2fr 1fr 1fr"
            />
          }
        >
          {new Array(10).fill(0).map((el, i) => {
            const listItem = ['test1', 'test2', 'test3', 'test4', <a key={0} onClick={() => console.log(11)}>aa</a>];
            return (
              <BoardListItem
                key={i}
                listItem={listItem}
                gridTemplateColumns="1fr 2fr 2fr 1fr 1fr"
                linkTo={`${i}`}
                isPreventDefault={true}
              />
            );
          })}
        </BoardList>}
      </Tab>
    </MyPageLayout>
  );
};

export default MyPage;

const MyPageLayout = styled.div`
  padding: 40px 20px 30px;
  max-width: 1140px;
  margin: 0 auto;

  & .edit-wrap {
    margin-top: 5px;    
  }

  & .tab {
    margin-top: 40px;
  }

  & .top {    
    //display: grid;
    //grid-template-columns: minmax(auto, 400px) auto;
    max-width: 400px;    
  }

  & .gallimg-wrap {
    overflow: hidden;
    max-height: 140px;
    img {
      width: 100%;
    }   
  }

  & .player-wrap {
    max-height: 100%;
  }

  // @media only screen and (max-width:560px) {
  //   & .top { 
  //     grid-template-columns: auto;
  //   }    
  // }
`;
