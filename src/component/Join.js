import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
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

const JoinDiv = styled.div`
  /* 로그인 Block Div 스타일 */
  width: 420px;
  height: 500px;
  position: absolute;
  padding: 40px 30px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const H3 = styled.h3`
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 20px;
`;

const Span = styled.span`
  font-size: 8px;
  float: left;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 2px;
  float: right;
  margin-top: 10px;
`;

// 팝업
const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 650px;
  height: 550px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const TermsDiv = styled.div`
  width: 100%;
  height: 80%;
  border-style: none;
  font-family: 'Segoe UI';
  font-weight: bold;
  color: #707070;
  text-align: left;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    border: 1px solid #a9a9a9;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #a2d6bb;
    border: 1px solid #a9a9a9;
  }
`;

const H2 = styled.h2`
  color: #554646;
  margin-top: 0px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 20px;
`;

const InputContainer = styled.input`
  width: 263px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid #707070;
  margin: 6px 0;
  padding: 5px;
  ::placeholder {
    font-size: 13px;
  }
`;

function Join(props) {

  const [showTerms, setShowTerms] = useState(false);
  const [outCheck, setOutcheck] = useState(false);

  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const [Name, setName] = React.useState('');
  const [ConfirmPassword, setConfirmPassword] = React.useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Name.length === 0) {
      return alert('이름을 입력하세요.');
    }

    if (Email.length === 0) {
      return alert('이메일을 입력하세요.');
    }

    //비밀번호와 비밀번호 확인 같을때 회원가입 되게 함
    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    // 비밀번호 8자리 이상
    if (Password.length < 8) {
      return alert('비밀번호는 8자리 이상이어야 합니다.');
    }

    if (!outCheck) {
      return alert('개인정보 수집 동의 체크가 필요합니다.');
    }

    // 회원가입 Request Data
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    if (body) {
      fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: Email,
          password: Password,
          name: Name,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('res :::', res);
          if (res.success === true) {
            alert('회원가입 되었습니다.');
            window.location.href = '/login';
          } else {
            alert('회원가입에 실패했습니다.');
          }
        });
    }
  };

  const openTerms = (event) => {
    // 팝업창 안에 동의 버튼
    if (event.target.name === 'termsCheck') {
      event.target.checked = false;
      setShowTerms(!showTerms); // 팝업창 호출
    } else {
      // 팝업창 밖에 동의 버튼
      if (event.target.checked === true) {
        setShowTerms(!showTerms); // 팝업창 호출
      }
      setOutcheck(event.target.checked); // 개인정보 수집 동의 체크버튼
    }
  };

  return (
    <div>
      <Header />
      <Div>
        <JoinDiv>
          <br />
          <img
            style={{ width: '50px' }}
            src={process.env.PUBLIC_URL + '/img/mountain.png'}
            alt="mountain url"
          />
          <H3>회원가입</H3>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            onSubmit={onSubmitHandler}
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
            <InputContainer
              type="password"
              value={Password}
              onChange={onPasswordHandler}
              placeholder="비밀번호 8자리 이상"
            />
            <InputContainer
              type="password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
              placeholder="비밀번호 확인"
            />
            <div>
              <Span>º 개인정보 수집에 동의하시나요?</Span>
              <Label>
                <input type="checkbox" onChange={openTerms} name="outCheck" />
                동의
              </Label>

              <ModalOverlay visible={showTerms} />
              <ModalWrapper tabIndex="-1" visible={showTerms}>
                <ModalInner tabIndex="0" className="modal-inner">
                  <H2>이용약관</H2> <hr />
                  <TermsDiv>
                    제1조(목적)
                    <br />
                    본 회원약관은 '등산했산'(이하 '갑'이라고 한다)이 운영하는
                    인터넷 관련 서비스(이하 '서비스'라 한다)를 이용함에 있어
                    관리자와 이용자(이하 '회원'이라고 한다)의 권리, 의무 및
                    책임사항을 규정함을 목적으로 한다.
                    <br />
                    <br />
                    제2조 (약관의 효력)
                    <br />
                    1. 본 약관은 '갑'에 회원가입 시 회원들에게 통지함으로써
                    효력을 발생합니다.
                    <br />
                    2.'갑'은 이 약관의 내용을 변경할 수 있으며, 변경된 약관은
                    제1항과 같은 방법으로 공지 또는 통지함으로써 효력을
                    발생합니다.
                    <br />
                    3. 약관의 변경사항 및 내용은 '갑'의 홈페이지에 개시하는
                    방법으로 공시합니다.
                    <br />
                    <br />
                    제3조(정의)
                    <br />
                    1. 이용자란 "웹사이트"에 접속하여 이 약관에 따라 서비스를
                    제공받는 "웹고객"과 "비웹고객"을 말합니다.
                    <br />
                    2. "웹고객"이라 함은 "웹사이트"에서 정한 가입 양식에 따 라
                    개인정보를 제공하여 등록을 한 자로서, "웹사이트"의 정보를
                    지속적으로 제공받으며, 서비스를 계속적으로 이용할 수 있는
                    자를 말합니다.
                    <br />
                    3. "비웹고객"이라 함은 웹고객으로 가입하지 않고
                    "웹사이트"에서 제공하는 정보를 이용하는 자를 말합니다.
                    <br />
                    <br />
                    제4조(서비스의 중단)
                    <br />
                    1. "웹사이트"는 컴퓨터 등 정보통신설비의 보수점검·교체 및
                    고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의
                    제공을 일시적으로 중단할 수 있습니다.
                    <br />
                    2. 제1항에 의한 서비스 중단의 경우 에는 제8조에 정한
                    방법으로 이용자에게 통지합니다.
                    <br />
                    <br />
                    제5조(웹고객 가입)
                    <br />
                    1. 이용자는"웹사이트"에서 정한 가입 양식에 따라 회원정보를
                    기입한 후 이 약관에 동의한다는 의사표시를 함으로서
                    웹고객으로 가입할 수 있습니다.
                    <br />
                    2. 웹고객은 등록사항에 변경이 있는 경우, 이용자는 개인정보의
                    보호 및 관리를 위하여 "웹사이트"의 개인정보변경에서 수시로
                    개인정보를 수정할 수 있습니다.
                    <br />
                    3. 웹고객은 회원정보가 변경되었을 경우 온라인으로 수정하여야
                    합니다. 변경사항을 수정하지 않아 발생한 불이익에 대하여
                    '갑'이 책임지지 않습니다.
                    <br />
                    <br />
                    제6조("웹사이트"의 의무)
                    <br />
                    "웹사이트"는 법령과 이 약관에 반하는 행위를 하지 않으며 이
                    약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를
                    제공하는데 최선을 다하여야 합니다.
                    <br />
                  </TermsDiv>
                  <br />
                  <label
                    style={{
                      float: 'left',
                      fontWeight: 'bold',
                      color: '#707070',
                    }}
                  >
                    <input
                      type="checkbox"
                      onClick={openTerms}
                      name="termsCheck"
                    />
                    위의 내용에 동의합니다.
                  </label>
                </ModalInner>
              </ModalWrapper>
            </div>
            <br />
            <Button type="submit">회원가입</Button>
            {/* <button type="submit">회원가입</button> */}
            <br />
          </form>
        </JoinDiv>
      </Div>
      <Footer />
    </div>
  );
}

export default Join;
