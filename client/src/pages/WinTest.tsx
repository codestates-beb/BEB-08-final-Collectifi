import axios from 'axios';
import React, {useEffect, useState} from 'react';

interface gameInfo {
  drawDiainage: number;
  drawToken: number;
  loseDiainage: number;
  loseToken: number;
  totalToken: number;
  winDiainage: number;
  winToken: number;
}

const WinTest = () => {
  const [gameInfo, setGameInfo] = useState<gameInfo>();

  useEffect(() => {
    axios.get('http://localhost:8000/admin/win', {withCredentials: true}).then(res => {
      console.log(res.data.data);
      setGameInfo(res.data.data);
    });
  }, []);

  return <div>{gameInfo ? <div>총 베팅 수량 : {gameInfo.totalToken}</div> : null}</div>;
};

export default WinTest;
