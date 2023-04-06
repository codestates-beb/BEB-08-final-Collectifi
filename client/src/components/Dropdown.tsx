import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

interface DropdownProps {
  dropdown: string;
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
  top: 70px;
  list-style: none;
  text-align: start;
`;

const Item = styled.li`
  background: rgb(175, 175, 179)
  cursor: pointer;
`;

const ItemLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: ;#9a6aff;
  padding: 16px;

  &:hover {
    background: grey;

  }
`;

const Dropdown = ({dropdown, setDropdown, submenu}: DropdownProps) => {
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
