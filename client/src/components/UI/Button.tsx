import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

type Props = {
  className?: string; 
  type?: 'submit' | 'reset' | 'button'; 
  onClick?: () => void;
  children?: React.ReactNode;
  color?: string;
}

const Button: React.FC<Props> = (props) => {
  return (
    <ButtonLayout
      className={`button ${props.className || ''}`}
      type={props.type || 'button'}
      onClick={props.onClick}
      color={props.color}
    >
      {props.children}
    </ButtonLayout>
  );
};

Button.defaultProps = {
  //color: '#333',
}

export default Button;


const ButtonLayout = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  border-radius: 100px;
  padding: 14px 30px;
  color: rgb(250, 250, 250);
  font-weight: bold;
  cursor: pointer;
  
  //크기
  //height: 2rem;
  //width: 4rem;
  font-size: 0.875rem;

  ${props => {
    let selected = props.color || props.theme.mainColor;
    if(!selected) selected = '#333' 
    return css`
      background: ${selected};
      &:hover {
        background: ${darken(0.1, selected)};
      }
      &:active {
        background: ${darken(0.2, selected)};
      }      
    `
  }}  
`