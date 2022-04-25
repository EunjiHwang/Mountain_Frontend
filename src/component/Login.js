import { useState } from "react";
import styled from 'styled-components';
import Input from './memberStyled/Input';
import Button from './memberStyled/Button';
import Header from "./Header";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

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

const Span = styled.span`
  font-size: 12px;
  color: #707070;
  margin: 3px;
  font-weight: bold;
`

const H3 = styled.h3`
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 5px;
`


function Login(props) {
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
        <H3>로그인</H3><hr width="100%" /><br />
        <form style={{
        display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
        >
        <Input type="email" value={Email} onChange={onEmailHandler} placeholder="이메일" />
        <Input type="password" value={Password} onChange={onPasswordHandler} placeholder="비밀번호 8자리 이상" />
        <Button type="submit">로그인</Button>
        <div><Link to="/password" style={{ textDecoration: 'none' }}><Span>비밀번호 찾기</Span></Link><Span> | </Span><Link to="/join" style={{ textDecoration: 'none' }}><Span>회원가입</Span></Link></div>
        </form>
      </LoginDiv>     
    </Div>
    <Footer />
    </div>
  );
}

export default Login;