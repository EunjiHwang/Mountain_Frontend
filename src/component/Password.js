import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

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

const PasswordDiv = styled.div`
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
`;

const H3 = styled.p`
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 20px;
`;

const NextBtn = styled.div`
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

function Password() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const navigate = useNavigate();

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  // 이름과 이메일을 입력해 이메일 요청보내기
  const onClickNext = (event) => {
    event.preventDefault();

    let body = {
      name: Name,
      email: Email,
    };

    if (body) {
      fetch('http://54.208.255.25:8080/api/users/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: Name,
          email: Email,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            localStorage.setItem('passwordToken', result.resetPasswordToken);
            alert('이메일로 새 비밀번호 설정 링크가 전송됩니다.');
            navigate('/login');
          } else {
            alert('이름 또는 이메일 확인이 필요합니다.');
          }
        });
    }
  };

  // const onClickNext = (event) => {
  //   event.preventDefault();
  //   alert('이메일로 비밀번호 변경 링크가 전송됩니다.');
  //   navigate('/passwordnext');
  // };

  return (
    <div>
      <Header />
      <Div>
        <PasswordDiv>
          <br />
          <br />
          <img
            style={{ width: '50px' }}
            src={process.env.PUBLIC_URL + '/img/mountain.png'}
            alt="mountain url"
          />
          <H3>비밀번호 찾기</H3>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <hr width="100%" />
            <InputContainer
              type="name"
              value={Name}
              onChange={onNameHandler}
              placeholder="이름"
            />
            <InputContainer
              type="email"
              value={Email}
              onChange={onEmailHandler}
              placeholder="이메일"
            />
            <NextBtn onClick={onClickNext}>다 음</NextBtn>
            <br />
          </form>
        </PasswordDiv>
      </Div>
      <Footer />
    </div>
  );
}

export default Password;
