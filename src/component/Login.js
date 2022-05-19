import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Button from './memberStyled/Button';

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
  width: 420px;
  height: 500px;
  position: absolute;
  padding: 10px 60px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Span = styled.span`
  font-size: 12px;
  color: #707070;
  margin: 3px;
  font-weight: bold;
`;

const H3 = styled.p`
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 20px;
`;

const InputContainer = styled.input`
  width: 263px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid #707070;
  margin: 5px 0;
  padding: 5px;
  ::placeholder {
    font-size: 13px;
  }
`;

function Login(props) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // 로그인 버튼 클릭시 로그인 요청 보내기
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    if (body) {
      fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.loginSuccess === true) {
            localStorage.setItem('token', result.token);
            // 홈으로 이동
            alert('로그인 되었습니다.');
            window.location.href = '/';
          } else {
            alert('회원가입이나 비밀번호 확인이 필요합니다.');
          }
        });
    }
  };

  return (
    <div>
      <Header />
      <Div>
        <LoginDiv>
          <img
            style={{ width: '50px' }}
            src={process.env.PUBLIC_URL + '/img/mountain.png'}
            alt="mountain url"
          />
          <H3>로그인</H3>
          <hr width="100%" />
          <br />
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            onSubmit={onSubmitHandler}
          >
            <InputContainer
              type="email"
              value={Email}
              onChange={onEmailHandler}
              placeholder="이메일"
            />
            <InputContainer
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              placeholder="비밀번호 8자리 이상"
            />
            <Button type="submit">로그인</Button>
            <div>
              <Link to="/password" style={{ textDecoration: 'none' }}>
                <Span>비밀번호 찾기</Span>
              </Link>
              <Span> | </Span>
              <Link to="/join" style={{ textDecoration: 'none' }}>
                <Span>회원가입</Span>
              </Link>
            </div>
          </form>
        </LoginDiv>
      </Div>
      <Footer />
    </div>
  );
}

export default Login;
