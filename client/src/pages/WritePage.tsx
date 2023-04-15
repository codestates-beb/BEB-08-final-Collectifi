import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {NavLogo} from '../components/Header';
import axios from 'axios';
import {useNavigate} from 'react-router';

interface Height {
  height: number;
}

const Wrapper = styled.div`
  height: 100vh;
  max-width: 90%;
  margin: 0 auto;
  margin-bottom: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    max-width: 93%;
  }
`;
const WriteLogo = styled(NavLogo)`
  padding: 10px;
  margin: 20px;
  font-size: 2rem;
  align-self: flex-start;
`;

export const WriteLabel = styled.label`
  text-align: left;
  font-size: 1.5rem;
  display: block;
`;
const Writeh2 = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.mainColor};
  margin-bottom: 30px;
`;
export const WriteForm = styled.form`
  /* height: 100px; */
`;
// height: ${props => props.height}px;
export const WriteInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;
export const WriteTextarea = styled.textarea`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
  resize: none;
  height: 600px;
`;
export const WriteSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;

const WriteNav = styled.div`
  background: #e7e5e5;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 10;
`;

export const WriteButton = styled.button`
  background: #f1356d;
  color: #fff;
  white-space: nowrap;
  border: 0;
  padding: 14px 30px;
  border-radius: 12px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 10px;
`;
const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('mario');
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post('http://localhost:8000/community/post', {title, content}, {withCredentials: true})
      .then(res => {
        console.log(res);
        navigate('/community');
        //ToDo 토스트메세지: You have successfully written
      })
      .catch(err => {
        alert('Please log in again.');
        navigate('/community');
      });
  };

  return (
    <>
      <Wrapper>
        <WriteLogo to="/" style={{color: 'black'}} className="logo">
          Collectifi
        </WriteLogo>
        <Writeh2>Add a New Post</Writeh2>
        <WriteForm>
          <WriteLabel>title</WriteLabel>
          <WriteInput
            maxLength={60}
            placeholder="제목을 입력하세요"
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <WriteLabel>content</WriteLabel>
          <WriteTextarea
            required
            value={content}
            onChange={e => setContent(e.target.value)}
          ></WriteTextarea>
          <WriteInput
            placeholder="#태그입력"
            type="text"
            required
            value={tag}
            onChange={e => setTag(e.target.value)}
          />
          {/* <WriteLabel>Post author:</WriteLabel>
        <WriteSelect value={author} onChange={e => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </WriteSelect> */}
        </WriteForm>
      </Wrapper>
      <WriteNav>
        <WriteButton onClick={() => handleSubmit()}>Post</WriteButton>
      </WriteNav>
    </>
  );
};

export default WritePage;
