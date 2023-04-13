import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLogo} from '../components/Header';

const Wrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  text-align: center;
  /* padding: 20px; */
  @media only screen and (max-width: 768px) {
    max-width: 93%;
  }
`;
const WriteLogo = styled(NavLogo)`
  padding: 10px;
  margin: 20px;
  font-size: 2.5rem;
`;

const WriteLabel = styled.label`
  text-align: left;
  display: block;
`;
const Writeh2 = styled.h2`
  font-size: 20px;
  color: ${props => props.theme.mainColor};
  margin-bottom: 30px;
`;
const WriteForm = styled.form``;
const WriteInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;
const WriteTextarea = styled.textarea`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;
const WriteSelect = styled.select`
  width: 100%;
  padding: 6px 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  display: block;
`;
const WriteButton = styled.button`
  background: #f1356d;
  color: #fff;
  border: 0;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
`;
const WritePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [tag, setTag] = useState('');
  return (
    <Wrapper>
      <WriteLogo to="/" style={{color: 'black'}} className="logo">
        Collectifi
      </WriteLogo>
      <Writeh2>Add a New Post</Writeh2>
      <WriteForm>
        <WriteLabel>Post title</WriteLabel>
        <WriteInput
          placeholder="제목을 입력하세요"
          type="text"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <WriteLabel>Post body</WriteLabel>
        <WriteTextarea
          required
          value={body}
          onChange={e => setBody(e.target.value)}
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
        <WriteButton>Add Post</WriteButton>
      </WriteForm>
    </Wrapper>
  );
};

export default WritePage;
