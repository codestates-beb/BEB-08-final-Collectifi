import React from 'react';
import {Box, motion} from 'framer-motion';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  border-radius: 30px;
  width: 75%;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 600px;
  background-color: white;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ModalInput = styled.input`
  width: 75%;
  height: 40px;
  padding: 5px;
`;

const ModalAmount = styled.div`
  height: 10px;
`;

const ModalBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: #fd115c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  interface AdminData {
    username: string;
    password: string;
  }

  const onSubmit = async (data: any) => {
    const {username, password} = data;
    const response = await axios.post(
      'http://localhost:8000/admin/login',
      {username, password},
      {withCredentials: true},
    );
    if (response.status == 200) {
      navigate('/admin');
    }
    return console.log(response);
  };
  console.log(watch('username'));
  return (
    <div>
      <ModalOverlay>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalTitle>Admin Login</ModalTitle>
            <ModalInput placeholder="username" {...register('username', {required: true})} />
            <ModalInput placeholder="password" {...register('password', {required: true})} />
            <ModalBtn type="submit">Login</ModalBtn>
          </ModalContent>
        </form>
      </ModalOverlay>
    </div>
  );
};

export default AdminLogin;
