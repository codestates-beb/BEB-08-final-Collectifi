import React from 'react';
import {Box, motion} from 'framer-motion';
import styled from 'styled-components';

interface BoxProps {
  backgroundColor: string;
}

const StyledBox = styled(motion.div)<BoxProps>`
  background-color: ${({backgroundColor}) => backgroundColor};
  width: 100px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
`;

const BoxComponent: React.FC<BoxProps> = ({backgroundColor}) => {
  return <StyledBox backgroundColor={backgroundColor} />;
};

export default BoxComponent;
