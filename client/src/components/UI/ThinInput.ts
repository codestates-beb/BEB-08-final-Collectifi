import styled, {css} from "styled-components"
import Input from '../UI/Input';

export const ThinInput = styled(Input)`
  ${props => css`
    padding: 7px 14px 7px;
    border: none;
    box-shadow: 0 0 0 1px ${props.theme.lineColor};
    &:focus-visible {
      background-color: #fff;
      border: none;
      box-shadow: 0 0 0 2px ${props.theme.mainColor};
    }
  `}  
`