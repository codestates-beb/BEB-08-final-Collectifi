import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

type Props = {
  class?: string; 
  type?: 'submit' | 'reset' | 'button'; 
  onClick?: () => void;
  children?: React.ReactNode;
  color?: string;
}


const Button: React.FC<Props> = (props) => {
  return (
    <StyledButton
      className={`button ${props.class && props.class}`}
      type={props.type || 'button'}
      onClick={props.onClick}
      color={props.color}
    >
      {props.children}
    </StyledButton>
  );
};

Button.defaultProps = {
  //color: '#333',
}

export default Button;


const StyledButton = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  
  //크기
  height: 2rem;
  width: 4rem;
  font-size: 1rem;

  ${props => {
    let selected = props.color || props.theme.mainColor;
    if(!selected) selected = '#333' 
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }      
    `
  }}  
`