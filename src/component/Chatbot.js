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
  display: flex;
  flex-direction: column;
  right: 50px;
  bottom: 120px;
  border: 3px solid #a0e991;
  border-radius: 10px;
  display: flex;
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

// 나
const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 50px;
  margin: 5px 0 0 40px;
`;

// 나를 표시하는 텍스트
const MyTitle = styled.div`
  width: 40px;
  height: 40px;
  font-weight: 600;
  color: #4c8969;
  border: 2px solid #4c8969;
  border-radius: 30px;
  text-align: center;
  padding-top: 10px;
  margin-top: 3px;
`;

// 내가 보내는 말풍선
const MyMsg = styled.div`
  width: 250px;
  height: 35px;
  position: relative;
  background-color: #a0e991;
  border-radius: 15px;
  font-size: 12px;
  margin: 5px 5px 0 0;
  padding: 10px;
  
`;

// 봇
const BotContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 300px;
  height: 50px;
  margin: 5px 0 0 5px;
`;

// 봇을 표시하는 텍스트
const BotTitle = styled.div`
  width: 40px;
  height: 40px;
  font-weight: 600;
  color: white;
  background-color: #4c8969;
  border-radius: 30px;
  text-align: center;
  padding-top: 12px;
  margin-top: 3px;
`;

// 봇이 보내는 말풍선
const BotMsg = styled.div`
  width: 250px;
  height: 38px;
  position: relative;
  border: 2px solid #a0e991;
  border-radius: 17px;
  font-size: 12px;
  margin: 5px 5px 0 5px;
  padding: 5px;
  line-height: 1.1;
`;


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

  // 사용자 메시지, 응답
  const [sendMsg, setSendMsg] = useState('');
  const [resMsg, setResMsg] = useState('');
  const [secondMsg, setSecondMsg] = useState('');
  const [resSecondMsg, setResSecondMsg] = useState('');

  const dispatch = useDispatch();

  const handleIcon = () => {
    setIsClicked(!isClicked);
  };


  // 임시 촬영용 handler
  const onKeyHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        return alert('메시지를 입력해주세요!');
      } else {
        // input을 sendMsg로 set
        if (e.target.value === '등산 준비물') {
          setSendMsg(e.target.value);
          setTimeout(function () {
            setResMsg('편한 복장, 등산화, 손전등, 물, 간식, 비상약, 휴지 등을 챙기시는걸 추천드려요!');
          }, 1500);
        } else if (e.target.value === '등산 시간') {
          setSecondMsg(e.target.value);
          setTimeout(function () {
            setResSecondMsg('하루에 산행은 8시간 이내로 하고 체력의 30%는 비축해두는게 좋아요!');
          }, 1500);
        } else {
          setSendMsg(e.target.value);
          setTimeout(function () {
            setResMsg('지원하지 않는 답변입니다ㅠㅠ');
          }, 1500);
        }
      }
      e.target.value = '';
    }
  }

  // useEffect(() => {
  //   eventQuery('welcomeToMyWebsite');
  // }, []);

  // 서버로 요청을 보낼 함수
  // const textQuery = async (text) => {
  //   // 1. 보낸 메시지를 관리
  //   let conversation = {
  //     who: 'user',
  //     content: {
  //       text: {
  //         text: text,
  //       },
  //     },
  //   };

  //   dispatch(saveMessage(conversation));

  //   // 2. 챗봇이 보낸 메시지를 처리
  //   const textQueryVar = {
  //     text,
  //   };
  //   // request 보내기
  //   try {
  //     // request to textQuery Route
  //     const response = await Axios.post(
  //       'http://54.208.255.25:8080/api/dialogflow/textQuery',
  //       textQueryVar
  //     );
  //     const content = response.data.fulfillmentMessages[0];

  //     conversation = {
  //       who: 'bot',
  //       content: content,
  //     };
  //     console.log(conversation);
  //   } catch (error) {
  //     conversation = {
  //       who: 'bot',
  //       content: {
  //         text: {
  //           text: 'Error가 발생했습니다. 문제를 확인해주세요.',
  //         },
  //       },
  //     };
  //     console.log(conversation);
  //   }
  // };

  // const eventQuery = async (event) => {
  //   // 2. 챗봇이 보낸 메시지를 처리
  //   const eventQueryVar = {
  //     event,
  //   };
  //   // request 보내기
  //   try {
  //     // request to textQuery Route
  //     const response = await Axios.post(
  //       '/api/dialogflow/eventQuery',
  //       eventQueryVar
  //     );
  //     const content = response.data.fulfillmentMessages[0];

  //     let conversation = {
  //       who: 'bot',
  //       content: content,
  //     };
  //     console.log(conversation);
  //   } catch (error) {
  //     let conversation = {
  //       who: 'bot',
  //       content: {
  //         text: {
  //           text: 'Error가 발생했습니다. 문제를 확인해주세요.',
  //         },
  //       },
  //     };
  //     console.log(conversation);
  //   }
  // };

  // const onKeyHandler = (e) => {
  //   // 엔터키 이벤트
  //   if (e.key === 'Enter') {
  //     // 아무것도 입력하지 않았을 경우
  //     if (!e.target.value) {
  //       return alert('메시지를 입력해주세요!');
  //     }
  //     // 메시지를 입력했다면 이를 보냄
  //     textQuery(e.target.value);
  //     // 보낸 후에는 value를 빈 값으로
  //     e.target.value = '';
  //   }
  // };

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
          <BotContainer setTimeout={1000}>
            <BotTitle>Bot</BotTitle>
            <BotMsg>안녕하세요 저는 등산의 챗봇이에요^0^!</BotMsg>
          </BotContainer>
          {sendMsg && (
            <div>
              <MyContainer>
                <MyMsg>{sendMsg}</MyMsg>
                <MyTitle>Me</MyTitle>
              </MyContainer>
              {resMsg && (
                <BotContainer>
                  <BotTitle>Bot</BotTitle>
                  <BotMsg>{resMsg}</BotMsg>
                </BotContainer>
              )}
            </div>
          )}
          {secondMsg && (
            <div>
              <MyContainer>
                <MyMsg>{secondMsg}</MyMsg>
                <MyTitle>Me</MyTitle>
              </MyContainer>
            {resSecondMsg && (
              <BotContainer>
                <BotTitle>Bot</BotTitle>
                <BotMsg>{resSecondMsg}</BotMsg>
              </BotContainer>
            )}
          </div>
          )}
        </ChatContainer>
      )}
    </ChatWrapper>
  );
}

export default Chatbot;
