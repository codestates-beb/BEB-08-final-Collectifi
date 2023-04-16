import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

interface DropdownProps {
  setDropdown: (value: string) => void;
  submenu?: SubmenuItem[];
}
interface MenuItem {
  name: string;
  link: string;
  submenu?: SubmenuItem[];
}
interface SubmenuItem {
  name: string;
  link: string;
}

const DropdownMenu = styled.ul`
  width: 10rem;
  position: absolute;
  top: 69px;
  list-style: none;
  text-align: start;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 3px 3px 3px #f3f3f3;
  margin-left: -25px;
`;

const Item = styled.li`
  background: white;
  cursor: pointer;
  padding: 5px;
  /* border: 1px solid black; */
`;

const ItemLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #404040;
  padding: 16px;
  font-weight: 600;
  border-radius: 5px 5px 5px 5px;
  &:hover {
    background: rgb(241, 241, 241);
  }
`;

const Dropdown = ({setDropdown, submenu}: DropdownProps) => {
  return (
    <DropdownMenu onClick={() => setDropdown('')}>
      {submenu?.map(item => (
        <>
          <Item>
            <ItemLink to={item.link}>{item.name}</ItemLink>
          </Item>
        </>
      ))}
    </DropdownMenu>
  );
};

export default Dropdown;
