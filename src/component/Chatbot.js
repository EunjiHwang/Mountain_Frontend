import styled from 'styled-components';
import ChatbotImg from './assets/chatbot.png';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Axios from 'axios';

// 챗봇 전체를 감싸는 컴포넌트
const ChatWrapper = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

// 챗봇 채팅창
const ChatContainer = styled.div`
  width: 350px;
  height: 470px;
  position: fixed;
  background-color: white;
  right: 50px;
  bottom: 120px;
  border: 3px solid #a0e991;
  border-radius: 10px;
`;

// 챗봇 input
const ChatInput = styled.input`
  width: 330px;
  height: 50px;
  position: fixed;
  right: 58px;
  bottom: 130px;
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
  background-color: #a0e991;
  border: 1px solid white;
  position: fixed;
  right: 30px;
  bottom: 90px;
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

  const dispatch = useDispatch();

  useEffect(() => {
    eventQuery('welcomeToMyWebsite')
  },[])

  const handleIcon = () => {
    setIsClicked(!isClicked);
  };

  // 서버로 요청을 보낼 함수
  const textQuery = async (text) => {
    // 1. 보낸 메시지를 관리
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));

    // 2. 챗봇이 보낸 메시지를 처리
    const textQueryVar = {
      text,
    };
    // request 보내기
    try {
      // request to textQuery Route
      const response = await Axios.post(
        'http://54.208.255.25:8080/api/dialogflow/textQuery',
        textQueryVar
      );
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: 'bot',
        content: content,
      };
      console.log(conversation);
    } catch (error) {
      conversation = {
        who: 'bot',
        content: {
          text: {
            text: 'Error가 발생했습니다. 문제를 확인해주세요.',
          },
        },
      };
      console.log(conversation);
    }
  };



  const eventQuery = async (event) => {


    // 2. 챗봇이 보낸 메시지를 처리
    const eventQueryVar = {
      event
    }
    // request 보내기
    try {
      // request to textQuery Route
      const response = await Axios.post('/api/dialogflow/eventQuery', eventQueryVar)
      const content = response.data.fulfillmentMessages[0] 

      let conversation = {
        who: 'bot',
        content: content
      }
      console.log(conversation);
    } catch (error) {
      let conversation = {
        who: 'bot',
        content: {
          text: {
            text: 'Error가 발생했습니다. 문제를 확인해주세요.'
          }
        }
      }
      console.log(conversation);
    }

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
      e.target.value = '';
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
