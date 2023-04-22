import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
  }`;
};

const Box = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Timer = () => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Box>End : {formatTime(seconds)}</Box>
    </div>
  );
};

export default Timer;
