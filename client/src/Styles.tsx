import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';

// 컴포넌트
export const Layout = styled.div`
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    max-width: 93%;
  }
`;
// 테스트용 컴포넌트
export const DummyComponent = styled.div`
  height: 150px;
`;

// 글로벌 스타일
const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;  
  font-family: 'Encode Sans Expanded', 'sans-serif';
  line-height: 1;
}
:root {
  --toastify-color-progress-light: linear-gradient(
    to right,
    #ff2d55,
    #ff2d55,
    #ff2d55,
    rgb(253, 17, 92),
    rgb(253, 17, 92),
    rgb(253, 17, 92)
  );
}
ol, ul {
  list-style: none;
}

body {
  color: rgb(18, 18, 18);
  background-color: rgb(250, 250, 250);
}

a {
  color: rgb(18, 18, 18);
  text-decoration: none;
}

`;

export default GlobalStyle;
