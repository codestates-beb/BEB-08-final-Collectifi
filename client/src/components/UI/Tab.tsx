import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

type Props = {
  title: string[];
  children: React.ReactNode;
}

const Tab: React.FC<Props> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const clickHandler = (index: number) => {
    setSelectedIndex(index);
  }

  return (<div className='Tab'>
    <TabUl>
      {props.title.map((el, i) => {
        return (<TabLi key={i}>
          <TabButton 
          onClick={() => clickHandler(i)} 
          selected={selectedIndex === i} 
          color={'rgb(123, 123, 123)'}>
            {el}
          </TabButton>
        </TabLi>)
      })}
    </TabUl>
    <div>
      {React.Children.map(props.children, (child, i) => {
        if (selectedIndex === i) {
          return child;
        }
      })}
    </div>
  </div>
  )
}

export default Tab;


const TabUl = styled.ul`
  margin-bottom: 40px;
  ${props => {
    return css`
    border-bottom: solid 1px ${props.theme.lineColor || 'rgb(0, 0, 0)'}
    `
  }}
`

const TabLi = styled.li`
  display: inline-flex;
  margin-right: 40px;
`

const TabButton = styled.button<{selected: boolean}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: rgb(100, 109, 117);
  cursor: pointer;
  background: transparent;
  padding: 0px 0px 12px;
  
  ${props => {
    return css`
    color: ${props.color || 'rgb(0, 0, 0)'};
    &:hover {
      color: ${darken(0.2, props.color || 'rgb(0, 0, 0)')};
    }
    &:active {
      color: ${lighten(0.1, props.color || 'rgb(0, 0, 0)')};
    }   
    `; 
  }}
  
  ${props => {
    return props.selected && css`
    color: ${props.theme.mainColor || 'rgb(0, 0, 0)'};
    box-shadow: 0px 1px 0px 0px ${props.theme.mainColor || 'rgb(0, 0, 0)'};
    `; 
  }}
`