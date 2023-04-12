import React from 'react';
import styled from 'styled-components';
import {Layout} from '../Styles';

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
  background: ${props => props.theme.mainColor};
  width: 150px;
  height: 200px;
  border-radius: 10%;
  border: 1px solid black;
  color: white;
  text-align: center;
`;

const DummyComponent = styled.div`
  height: 150px;
`;

const DrawCardPage = () => {
  return (
    <Layout>
      <DummyComponent />
      <PackList>
        <PackListItem>
          <PackLabel>Basic</PackLabel>
          <Pack>
            <div>Bronze</div>
            <div>10 ETH</div>
          </Pack>
        </PackListItem>
        <PackListItem>
          <PackLabel>Standard</PackLabel>
          <Pack>
            <div>Silver</div>
            <div>25 ETH</div>
            <div></div>
          </Pack>
        </PackListItem>
        <PackListItem>
          <PackLabel>Preminum</PackLabel>
          <Pack>
            <div>Gold</div>
            <div>50 ETH</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Pack>
        </PackListItem>
      </PackList>
      <DummyComponent />
      <DummyComponent />
    </Layout>
  );
};

export default DrawCardPage;
