import styled from 'styled-components';
import ChatbotImg from './assets/chatbot.png';
import React, { useState } from 'react';

// 챗봇 전체를 감싸는 컴포넌트
const ChatWrapper = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  position: relative;
  right: 0;
  bottom: 0;
`;

// 챗봇 채팅창
const ChatContainer = styled.div`
  width: 350px;
  height: 470px;
  position: fixed;
  background-color: white;
  right: 50px;
  bottom: 50px;
  border: 3px solid #d8ffce;
  border-radius: 10px;
`;

// 챗봇 input
const ChatInput = styled.input`
  width: 330px;
  height: 50px;
  position: fixed;
  right: 60px;
  bottom: 65px;
  border: 0;
  border-top: 1px solid #707070;
  font-size: 15px;
  ::placeholder {
    color: #707070;
    font-size: 15px;
  }
`;

// 내가 보내는 말풍선

// 상대방 말풍선

//챗봇 아이콘
const IconWrap = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 30px;
  display: flex;
  background-color: #d8ffce;
  border: 1px solid white;
  position: fixed;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
  z-index: 3;
`;

const IconImg = styled.img`
  width: 50px;
  height: 50px;
  margin: auto;
`;

function Chatbot() {
  const [isClicked, setIsClicked] = useState(false);

  const handleIcon = () => {
    setIsClicked(!isClicked);
  };

  // 서버로 요청을 보낼 함수
  const textQuery = (text) => {
    // 1. 보낸 메시지를 관리
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text
        }
      }
    }
    // 2. 챗봇이 보낸 메시지를 처리
    // request 보내기

  }

  const onKeyHandler = (e) => {
    // 엔터키 이벤트
    if (e.key === 'Enter') {
      // 아무것도 입력하지 않았을 경우
      if (!e.target.value) {
        return alert('메시지를 입력해주세요!');
      }
      // 메시지를 입력했다면 이를 보냄
      textQuery(e.target.value);
      // 보낸 후에는 value를 빈 값으로 
      e.target.value = "";
    }
  };

  return (
    <ChatWrapper>
      <IconWrap onClick={handleIcon}>
        <IconImg src={ChatbotImg} />
      </IconWrap>
      {isClicked && (
        <ChatContainer>
          <ChatInput
            placeholder="여기에 입력해주세요."
            type="text"
            onKeyPress={onKeyHandler}
          />
        </ChatContainer>
      )}
    </ChatWrapper>
  );
}

export default Chatbot;
