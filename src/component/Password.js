import { useState } from "react";
import styled from 'styled-components';
import Input from './memberStyled/Input';
import Button from './memberStyled/Button';
import Header from "./Header";
import Footer from "./Footer";

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  height: 78vh;  
  text-align: center;
  font-family: 'Segoe UI';
`;

const LoginDiv = styled.div`
  /* 로그인 Block Div 스타일 */
  width: 300px; height: 350px;
  position: absolute;
  padding: 40px 30px; 
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 10px;
`

const H3 = styled.h3`
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 5px;
`
const Span = styled.span`
font-size: 2px;
text-align: left;
margin-bottom: 5px;
`

function Password(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Email', Email);
    console.log('Password', Password);
  }
  
  return (
    <div>
    <Header />
    <Div>
      <LoginDiv>
      <img style={{width:"30px"}}src = {process.env.PUBLIC_URL + '/img/mountain.png'} alt = "mountain url" />
        <H3>비밀번호 찾기</H3><hr width="100%" /><br />
        <form style={{
        display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
        >
        <Input type="name" placeholder="이름" />
        <Input type="email" value={Email} onChange={onEmailHandler} placeholder="이메일" />
        <Input type="password" value={Password} onChange={onPasswordHandler} placeholder="새로운 비밀번호 8자리 이상" />
        <Input type="password" value={Password} onChange={onPasswordHandler} placeholder="새로운 비밀번호 확인" />
        <Span>º 비밀번호를 변경하시겠습니까?</Span>
        <Button type="submit">변경</Button>
        <br />
        </form>
      </LoginDiv>     
    </Div>
    <Footer />
    </div>
  );
}

export default Password;