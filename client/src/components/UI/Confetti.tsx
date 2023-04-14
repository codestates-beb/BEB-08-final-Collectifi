import React, {useEffect, useState} from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  innerText: string;
}

const Confetti = ({innerText}: ConfettiProps) => {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const detectSize = () => {
    setWindowDimension({width: window.innerWidth, height: window.innerHeight});
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimension]);
  return (
    <>
      <button onClick={() => setShowConfetti(!showConfetti)}> {innerText}</button>
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      )}
    </>
  );
};

export default Confetti;
