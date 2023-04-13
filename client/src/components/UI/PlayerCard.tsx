import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  imgSrc: string;
  cardWidth?: string;
  glow?: Glow;
}

export enum Glow {
  orange = 'orange',
  brown = 'brown',
  black = 'black',
  beige = 'beige'
}

const PlayerCard: React.FC<Props> = (props) => {
  return (
  <PlayerCardLayout className='player-card' glow={props.glow} cardWidth={props.cardWidth}>
    <div className='img-wrapper'>
      <img src={props.imgSrc} alt='playerCard'/>
    </div>
  </PlayerCardLayout>
  )
}

export default PlayerCard;


const PlayerCardLayout = styled.div<{glow?: Glow; cardWidth?: string;}>`
  //background: black;

  & .img-wrapper {
    max-width: ${props => props.cardWidth || '100%'};
    overflow: hidden;
  }

  & img {
    width: 100%;
    transform: scale(1.6);
    margin: -10% 0 -5% 1%
  }

  ${props => {
    if(!props.glow) return;

    const glowColors = {
      orange: '243,146,0',
      brown: '132,91,65',
      black: '42,50,61',
      beige: '248,252,248'
    };
    const selectedGlow = glowColors[props.glow];  

    return css`
    & .img-wrapper {
      animation: card-glow 3s infinite;
    }

    @keyframes card-glow {
      0%, 100% {
          filter: drop-shadow(1px -3px 15px rgba(${selectedGlow},0.2));
      }
      50% {
          filter: drop-shadow(1px -3px 15px rgba(${selectedGlow},0.8));
      }
    }
    `
  }}  
`