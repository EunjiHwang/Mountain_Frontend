import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from './memberStyled/Input';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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

const EditDiv = styled.div`
  /* 정보수정 Block Div 스타일 */
  width: 650px;
  height: 450px;
  background: white;
  box-shadow: 0px 5px 10px;
`;

const TopDiv = styled.div`
  width: 90%;
  height: 20%;
  justify-content: center;
  padding-top: 6%;
  border-bottom: 1px solid #707070;
  margin-right: 5%;
  margin-left: 5%;
`;

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    border: 1px solid #70707063;
    border-radius: 75px;

    margin-right: 50px;
    margin-top: 40px;
  }

  form {
    margin-top: 50px;
  }
`;

const Btn = styled.button`
  position: relative;
  left: 20px;
  top: 10px;
  display: block;
  width: 107px;
  height: 29px;
  background: #afafaf 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 15px;
  text-align: center;
  font: normal normal 600 15px/20px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

const Outbtn = styled.button`
  position: relative;
  float: right;
  right: 25px;
  top: 20px;
  display: block;
  width: 107px;
  height: 29px;
  border: none;
  border-radius: 15px;
  text-align: center;
  font: normal normal 600 15px/20px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;

  &:hover {
    background: #afafaf 0% 0% no-repeat padding-box;
  }
`;

const Title = styled.div`
  display: inline;
  float: left;
  text-align: center;
  font: normal normal bold 22px Segoe UI;
  letter-spacing: 0px;
  color: #554646;
  margin-left: 50px;
`;

const SaveBtn = styled.button`
  display: inline;
  float: right;
  width: 50px;
  height: 30px;
  background: #4c8969;
  border-radius: 20px;
  font: normal normal bold 15px Segoe UI;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  margin-right: 50px;
  border: none;
`;

const Img = styled.div`
  height: 100%;
`;

function EditMe() {
  const [Nickname, setNickname] = useState('');
  const [Email, setEmail] = useState('');
  const [CurPassword, setCurPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [CheckPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onCurPasswordHandler = (event) => {
    setCurPassword(event.currentTarget.value);
  };

  const onNewPasswordHandler = (event) => {
    setNewPassword(event.currentTarget.value);
  };

  const onCheckPasswordHandler = (event) => {
    setCheckPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const editConnect = () => {
    fetch('http://54.208.255.25:8080/api/mypage/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: Nickname,
        email: Email,
        password: CheckPassword,
        old_password: CurPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (!res.message) {
            alert('현재 비밀번호가 일치하지 않습니다');
          } else {
            alert('정보가 수정되었습니다.');
            navigate('/mypage');
          }
        }
      })
      .then((error) => {
        console.log('error');
      });
  };

  const saveInfo = () => {
    console.log(Nickname, Email, CurPassword, NewPassword, CheckPassword);
    if (NewPassword === '' && CheckPassword === '') {
      editConnect();
    } else if (NewPassword === '' || CheckPassword === '') {
      alert('비밀번호를 입력해주세요.');
    } else if (NewPassword.length < 8) {
      alert('비밀번호를 8자 이상 입력해주세요.');
    } else if (NewPassword !== CheckPassword) {
      alert('새 비밀번호와 확인된 비밀번호가 일치하지 않습니다.');
    } else {
      editConnect();
    }
  };

  const outInfo = () => {
    fetch('http://54.208.255.25:8080/api/mypage/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: localStorage.getItem('userId'),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert('탈퇴가 완료되었습니다.');
      })
      .then((error) => {
        console.log('error');
      });
  };

  return (
    <div>
      <Header />
      <Div>
        <EditDiv>
          <TopDiv>
            <Title>회원정보 수정</Title>
            <SaveBtn type="submit" onClick={saveInfo}>
              저장
            </SaveBtn>
          </TopDiv>
          <MainDiv>
            <Img>
              <img src="https://cdn-icons-png.flaticon.com/512/1142/1142743.png"></img>

              <Btn type="submit">사진 변경</Btn>
            </Img>

            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              onSubmit={onSubmitHandler}
            >
              <Input
                type="nickname"
                value={Nickname}
                onChange={onNicknameHandler}
                placeholder="닉네임"
              />
              <Input
                type="email"
                value={Email}
                onChange={onEmailHandler}
                placeholder="이메일"
              />
              <Input
                type="password"
                value={CurPassword}
                onChange={onCurPasswordHandler}
                placeholder="현재 비밀번호"
              />

              <Input
                type="password"
                value={NewPassword}
                onChange={onNewPasswordHandler}
                placeholder="새로운 비밀번호"
              />

              <Input
                type="password"
                value={CheckPassword}
                onChange={onCheckPasswordHandler}
                placeholder="새로운 비밀번호 확인"
              />
            </form>
          </MainDiv>
          <Outbtn onClick={outInfo}>회원 탈퇴</Outbtn>
        </EditDiv>
      </Div>
      <Footer />
    </div>
  );
}

export default EditMe;
