import React from 'react';
import styled from 'styled-components';

type User = {
  id: number;
  nickname: string;
  address: string;
  token_amount: number;
  referral: string;
};

type UserListProps = {
  users: User[];
};

const Table = styled.table`
  font-size: 25px;
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const UserList: React.FC<UserListProps> = ({users}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nickname</th>
          <th>Address</th>
          <th>Token Amount</th>
          <th>Referral</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nickname}</td>
            <td>{user.address}</td>
            <td>{user.token_amount}</td>
            <td>{user.referral}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
