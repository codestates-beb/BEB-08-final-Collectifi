import React from 'react';
import styled from 'styled-components';
import {DummyComponent, Layout} from '../Styles';
import Button from '../components/UI/Button';

const PackList = styled.div`
  display: flex;
  gap: 30px;
`;
const PackListItem = styled.div`
  justify-content: center;
  align-items: center;
`;

const PackLabel = styled.div`
  margin: 5px;
  background: yellow;
  text-align: center;
`;

const Pack = styled.div`
  background: white;
  width: 220px;
  height: 300px;
  border-radius: 10%;
  /* border: 1px solid black; */
  color: black;
  text-align: center;
  box-shadow: 5px 5px 5px grey;
  &:hover {
    transform: translateY(-5px); /* 마우스를 올렸을 때 위로 이동 */
    transition: transform 0.5s ease; /* transition 속성 추가 */
  }
`;

const DrawCardPage = () => {
  return (
    <Layout>
      <DummyComponent />
      <div>보유: 10ETH</div>
      <Button>My Card</Button>
      <PackList>
        <PackListItem>
          <PackLabel>Basic</PackLabel>
          <Pack>
            <div>Pack</div>
            <div>10 ETH</div>
          </Pack>
        </PackListItem>
        <PackListItem>
          <PackLabel>Standard</PackLabel>
          <Pack>
            <div>Pack</div>
            <div>25 ETH</div>
          </Pack>
        </PackListItem>
        <PackListItem>
          <PackLabel>World Class</PackLabel>
          <Pack>
            <div>Pack</div>
            <div>50 ETH</div>
          </Pack>
        </PackListItem>
      </PackList>
      <DummyComponent />
    </Layout>
  );
};

export default DrawCardPage;
