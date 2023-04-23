import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from 'recoil';
import { stakeQuery, addCardRegiQuery } from '../../modules/gallery/atom';
import { userAddr, userAmount } from '../../modules/atom';
import { sendTx } from '../../modules/wallet';
import { stakeData } from '../../modules/gallery/type';
import ModalAlert from '../UI/ModalAlert';
import Button from '../UI/Button';

type Props = {
  gallId: number;
  selectedTokenId: number;
  endDate: string;
  galleryRefresh: () => void;
  addCardRefresh: () => void;
  onChange?: (timestamp: number) => void;
}

const RegiForm: React.FC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reward, setReward] = useState(0);
  const [stakeData, setStakeData] = useState<stakeData | null>(null);
  const userAddress = useRecoilValue(userAddr);
  const setUserAmount = useSetRecoilState(userAmount);
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
  
  const handleChange = (date: Date | null) => {
    if(!date) return;
    setSelectedDate(date);
    const timestamp = Math.floor(date.getTime() / 1000);
    setReward(updateReward(timestamp, 1));
    console.log(timestamp);
    if(props.onChange)
      props.onChange(timestamp);
  }

  const handleApproveClick = useRecoilCallback(({ snapshot }) => async () => {
    const timestamp = Math.floor(selectedDate.getTime() / 1000);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    //유효성 검사, 카드선택, 날짜
    if(timestamp <= currentTimestamp) {
      openModal("전시등록 실패", "날짜, 시간을 선택해주세요.");
      return;
    }
    if(props.selectedTokenId < 1) {
      openModal("전시등록 실패", "카드를 선택해주세요.");
      return;
    }
    //approve 요청
    const stakeParams = {
      id: props.selectedTokenId,
      unlockTime: timestamp
    }
    const stakeQ = await snapshot.getPromise(stakeQuery(stakeParams));
    if(!stakeQ) {
      return;
    }
    const stakeQData = stakeQ.data.data;    
    console.log(stakeQData);
    const approveResult = await sendTx(userAddress, stakeQData.erc721ca, stakeQData.approve);
    console.log(approveResult);
    if(!approveResult) { 
     openModal("전시등록 실패", "Approve 요청에 실패 했어요.");
     return;
    }     
    setStakeData(stakeQData);
    return;
  });

  const handleStakeClick = useRecoilCallback(({ snapshot }) => async () => {
    //stake 실행
    if(!stakeData) {
      openModal("전시등록 실패", "stakeData null");
      return;
    }
    const stakeResult = await sendTx(userAddress, stakeData.gallca, stakeData.stake);
    console.log(stakeResult);
    if(!stakeResult) { 
      openModal("전시등록 실패", "Stake 요청에 실패 했어요.");
      return;
    }   
    //db등록 요청    
    const params = {
      gallery_id: props.gallId,
      nft_id: props.selectedTokenId,
      nft_end_time: String(selectedDate)
    }
 
    const sellRegi = await snapshot.getPromise(addCardRegiQuery(params));
    console.log(params, sellRegi)
    if(!sellRegi) {
      openModal("전시등록 실패", "전시DB등록에 실패 했어요.");
      return;
    }    
    props.addCardRefresh();
    props.galleryRefresh();
    setStakeData(null);
    setUserAmount(cur => cur + reward);
    openModal("전시등록 성공", "전시등록에 성공 했어요.");
    return;
  });

  console.log(props.selectedTokenId);

  const minDate = new Date();
  const maxDate = new Date(props.endDate);

  return (
    <RegiFormLayout>
      {isOpen && (
        <ModalAlert
          title={title}
          message={message}
          onConfirm={handleModalClick}
        />
      )}
      <h2 className='title'>ADD MYCARD</h2>
      <h3 className='title-step1'>STEP1 Approve</h3> 
      {!stakeData && <div className='step1'>
        <div className='row'> 
          <span>END DATE</span>
          <div>          
            <DatePicker
              className='picker' 
              selected={selectedDate}
              onChange={handleChange}
              timeInputLabel="Time:"
              dateFormat="yyyy MM/dd h:mm aa"
              showTimeInput
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>        
        <div className='row'>
          <span>EXCUTE</span>
          <Button onClick={handleApproveClick}>OK</Button>
        </div>
      </div>}      
      <h3 className='title-step2'>STEP2 Stake my card</h3>
      {stakeData && <div className='step2'> 
        <div className='row'>
          <span>EXCUTE</span>   
          <div>
            <Button onClick={handleStakeClick}>OK</Button>
          </div>
        </div>
      </div>}
      
      <div className='expect row'>
        <span>RETURN</span>
        <div >{reward} COL</div>  
      </div>
          
    </RegiFormLayout>)
}

export default RegiForm;

const updateReward = (_unlockTime: number, rewardTokenAmount: number): number => {
  const now = Math.floor(Date.now() / 1000);
  if (_unlockTime < now) {
    return 0;
  }
  const timeDifference = _unlockTime - Math.floor(Date.now() / 1000);
  const numOfHours = timeDifference / (60 * 60);
  return Math.round(numOfHours * rewardTokenAmount);
}


const RegiFormLayout = styled.div`
  // padding: 40px 20px 30px;
  // max-width: 1140px;
  // margin: 0 auto;

  & .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    & span {
      color: rgb(123, 123, 123)
    }

    & :last-child {
      justify-self: end;
    } 
  }

  & .title {
    margin-bottom: 40px;
  }

  & .title-step1 {
    margin-bottom: 20px;
  }

  & .title-step2 {
    padding-top: 20px;
    margin-bottom: 20px;
    border-top: 1px solid ${props => props.theme.lineColor};
  }

  & .step1 {
    margin-bottom: 20px;
   
    button {
      //margin: 10px 0 20px 0;
    }
  }  

  & .step2 {
    margin-bottom: 20px;

    button {
      //margin: 10px 0;
    }
  }

  & .expect {
    border-top: 1px solid rgb(203, 203, 203);
    padding: 20px 0 0;
  }

  & .picker {
    border-radius: 100px;
    background-color: transparent;
    padding: 8px 14px 10px;
    outline: none;

    ${props => css`
      border: 1px solid ${props.theme.lineColor};
      &:focus-visible {
        background-color: #fff;
        border: 1px solid ${props.theme.mainColor};
        box-shadow: 0 0 0 2px ${props.theme.mainColor};
      }
    `} 
  }
`