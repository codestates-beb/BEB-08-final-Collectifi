import styled, { css } from 'styled-components';

const Input = styled.input`
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
`

export default Input;