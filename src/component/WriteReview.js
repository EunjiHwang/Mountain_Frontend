import { useState, React } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import StarScore from './StarScore';

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

const IntroDiv = styled.div`
  /* 소개글 Block Div 스타일 */
  width: 650px;
  height: 450px;
  position: absolute;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

// 타이틀
const TitleContainer = styled.div`
  width: 650px;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const ReviewTitle = styled.div`
  width: 600px;
  height: 50px;
  color: #707070;
  font-weight: 600;
  font-size: 22px;
  text-align: left;
  margin: 20px 0 0 25px;
`;

const SaveBtn = styled.button`
  background-color: #4C8969;
  width: 50px;
  height: 30px;
  color: white;
  border: 0;
  border-radius: 10px;
  margin: 15px 30px 0 0;
`;

const UnderBar = styled.div`
  width: 600px;
  height: 1px;
  border-bottom: 3px solid #C2C2C2;
  margin-top: 10px;
`;

// 총점
const ScoreContainer = styled.div`
  width: 250px;
  height: 40px;
  display: flex;
  flex-direction: row;
  margin: 30px 340px 0 0;
`;

const ScoreTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

// 별점 필요

// 시설
const StrContainer = styled.div`
  width: 100px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin: 30px 520px 0 0;
`;

const StrTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`; 

const StrContent = styled.div`
  font-size: 15px;
  text-align: left;
  margin: 12px 0 12px 15px;
`;

// 코멘트
const CommentContainer = styled.div`
  width: 280px;
  height: 450px;
  display: flex;
  flex-direction: column; 
  margin-left: 260px;
  margin-top: -310px;
`;

const CommentTitle = styled.p`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 3px;
  text-align: left;
`;

const Textarea = styled.textarea`
  height: 230px;
  width: 300px;
  border-radius: 20px;
  resize: none;
  padding: 10px;
  border: 1.5px solid #C1C2C5;
`;

const Hashtag = styled.input`
  height: 60px;
  width: 300px;
  border-radius: 10px;
  resize: none;
  margin-top: 15px;
  color: #1B54E3;
  padding: 2px;
  border: 1.5px solid #C1C2C5;
  font-size: 12px;
  ::placeholder{
    color: #707070;
  }
`;

// 시설 라디오 버튼
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: -160px 220px 0 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  background-color: transparent;
  color: #707070;
  padding: 5px;
`;

const YesBtn = styled.button`
  width: 43px;
  height: 30px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px solid #707070;
  border-right: transparent;
  background-color: transparent;
  &:hover{
    background-color: #E3FFE0;
  }
`;

const NoBtn = styled.button`
  width: 43px;
  height: 30px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #707070;
  background-color: transparent;
  &:hover{
    background-color: #E3FFE0;
  }
`;

function WriteReview(props) {

  const [hashtag, setHashtag] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [color, setColor] = useState('transparent');

  // 버튼 클릭 시 색상 변경
  const onClickBtn = () => {
    setIsClicked(!isClicked);
    if (isClicked === true) {
      setColor('#E3FFE0');
    } else {
      setColor('transparent');
    }
  };

  //단어를 입력하고 엔터를 누르면 해시태그 생성하는 키 프레스 이벤트
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      // onCreateHashtag();
    }
  }
 
  return (
    <div>
      <Header />
      <Div>
        <IntroDiv>
          <TitleContainer>
            <ReviewTitle>후기 작성</ReviewTitle>
            <SaveBtn>저장</SaveBtn>
          </TitleContainer>
          <UnderBar />
          <ScoreContainer>
            <ScoreTitle>총점</ScoreTitle>
            <StarScore />
          </ScoreContainer>
          <StrContainer>
            <StrTitle>시설 여부</StrTitle>
            <StrContent>화장실</StrContent>
            <StrContent>주차 공간</StrContent>
            <StrContent>음수대</StrContent>
            <StrContent>먹거리 시설</StrContent>
            <StrContent>음료 파는 곳</StrContent>
          </StrContainer>
          <BtnContainer>
            <BtnWrapper>
              <YesBtn onClick={onClickBtn} style={{backgroundColor: color}}>YES</YesBtn>
              <NoBtn onClick={onClickBtn} style={{backgroundColor: color}}>NO</NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn onClick={onClickBtn}>YES</YesBtn>
              <NoBtn onClick={onClickBtn}>NO</NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn onClick={onClickBtn}>YES</YesBtn>
              <NoBtn onClick={onClickBtn}>NO</NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn onClick={onClickBtn}>YES</YesBtn>
              <NoBtn onClick={onClickBtn}>NO</NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn onClick={onClickBtn}>YES</YesBtn>
              <NoBtn onClick={onClickBtn}>NO</NoBtn>
            </BtnWrapper>
          </BtnContainer>
          <CommentContainer>
            <CommentTitle>코멘트</CommentTitle>
            <Textarea />
            <Hashtag
              type="text"
              placeholder="#해시태그"
              value={hashtag}
              onKeyPress={onEnter}
            />
          </CommentContainer>
        </IntroDiv>
      </Div>
      <Footer />
    </div>
  );
}

export default WriteReview;
