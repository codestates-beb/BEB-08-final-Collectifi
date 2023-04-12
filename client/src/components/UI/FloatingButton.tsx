import React from 'react';
import styled from 'styled-components';

const Floating = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  border: 0;
  border-radius: 50%;
  background: rgb(255, 192, 203);
  /* background: rgba(188, 100, 140, 0.449); */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(16px);
  width: 50px;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const FloatingButton = () => {
  const scrollToTop = (duration: number, step: number) => {
    const totalScrollDistance = window.scrollY;
    const scrollStep = Math.PI / (duration / step);
    let scrollCount = 0;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, Math.round(totalScrollDistance * Math.cos(scrollCount)));
        scrollCount += scrollStep;
      } else {
        clearInterval(scrollInterval);
      }
    }, step);
  };
  const scrollTop = () => {
    scrollToTop(500, 5);
    // window.scrollTo(0, 0);
  };
  return <Floating onClick={() => scrollTop()}>TOP</Floating>;
};

export default FloatingButton;
