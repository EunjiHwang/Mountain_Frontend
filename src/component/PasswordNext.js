import { useState } from "react";
import styled from 'styled-components';
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

const PasswordNextDiv = styled.div`
  /* 로그인 Block Div 스타일 */
  width: 420px; 
  height: 500px;
  position: absolute;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`

const H3 = styled.p`
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 20px;
`

const InputContainer = styled.input`
  width: 263px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid #AFAFAF;
  margin: 5px 0;
  padding: 5px;
  ::placeholder{
    font-size: 13px;
  }
`;

const ChangeBtn = styled.div`
  width: 263px;
  height: 33px;
  background-color: #4c8969;
  border-radius: 10px;
  border: 0px;
  padding-top: 7px;
  margin: 10px 0 30px 0;
  color: white;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;
`;

const Span = styled.span`
font-size: 4px;
text-align: left;
margin: 5px 0;
`

function PasswordNext(props) {
  const [Password, setPassword] = useState("");

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('Password', Password);
  }
  
  return (
    <div>
    <Header />
    <Div>
      <PasswordNextDiv>
      <br/><br/>
      <img style={{width:"50px"}}src = {process.env.PUBLIC_URL + '/img/mountain.png'} alt = "mountain url" />
        <H3>비밀번호 변경</H3>
        <form style={{
        display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
        >
        <hr width='100%' />
        <InputContainer type="password" value={Password} onChange={onPasswordHandler} placeholder="새로운 비밀번호 8자리 이상" />
        <InputContainer type="password" value={Password} onChange={onPasswordHandler} placeholder="새로운 비밀번호 확인" />
        <Span>º 비밀번호를 변경하시겠습니까?</Span>
        <ChangeBtn type="submit">변경</ChangeBtn>
        <br />
        </form>
      </PasswordNextDiv>     
    </Div>
    <Footer />
    </div>
  );
}

export default PasswordNext;