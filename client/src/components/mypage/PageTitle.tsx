import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
}

const PageTitle: React.FC<Props> = (props) => {
  return (<PageTitleLayout>
        <h1>{props.title}</h1>
    </PageTitleLayout>)
}

export default PageTitle;

const PageTitleLayout = styled.div`
  margin-bottom: 40px;
`