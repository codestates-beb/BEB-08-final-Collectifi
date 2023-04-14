import React from 'react';
import {motion} from 'framer-motion';
import BoxComponent from './BoxComponent';
import styled from 'styled-components';

interface SliderProps {
  boxes: string[];
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Button = styled.button`
  margin-right: 16px;
`;

const ScrollableContainer = styled(motion.div)`
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slider: React.FC<SliderProps> = ({boxes}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    }
  };

  return (
    <div>
      <Container>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </Container>
      <ScrollableContainer
        ref={containerRef}
        drag="x"
        dragConstraints={{left: 0, right: 0}}
        whileTap={{cursor: 'grabbing'}}
      >
        {boxes.map(color => (
          <BoxComponent key={color} backgroundColor={color} />
        ))}
      </ScrollableContainer>
    </div>
  );
};

export default Slider;
