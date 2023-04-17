import styled, {css} from "styled-components"
import { darken } from "polished"
import Button from '../UI/Button';

export const ThinButton = styled(Button)`
  color: rgb(123, 123, 123);
  padding: 9px 20px;
  font-weight: 100;
  margin-right: 10px;

  ${props => css`
    border: 1px solid ${props.theme.lineColor};
    &:hover {
      border: 1px solid ${props.theme.mainColor};
      color: ${props.theme.mainColor};
      background: ${props.color};
    }
    &:active {
      border: 1px solid ${darken(0.4, props.theme.mainColor)};
      color: ${darken(0.4, props.theme.mainColor)};
      background: ${props.color}
    }   
  `}
`