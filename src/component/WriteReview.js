import { useState, React } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import StarScore from './StarScore';
import { useLocation } from 'react-router-dom';

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
  background-color: #4c8969;
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
  border-bottom: 3px solid #c2c2c2;
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
  border: 1.5px solid #c1c2c5;
`;

const Hashtag = styled.input`
  height: 60px;
  width: 300px;
  border-radius: 10px;
  resize: none;
  margin-top: 15px;
  color: #1b54e3;
  padding: 2px;
  border: 1.5px solid #c1c2c5;
  font-size: 12px;
  ::placeholder {
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
  &:hover {
    background-color: #e3ffe0;
  }
`;

const NoBtn = styled.button`
  width: 43px;
  height: 30px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #707070;
  background-color: transparent;
  &:hover {
    background-color: #e3ffe0;
  }
`;

function WriteReview(props) {
  const location = useLocation();
  const [hashtag, setHashtag] = useState('');
  // yes면 true, no면 false
  const [toilet, setToilet] = useState(false);
  const [parking, setParking] = useState(false);
  const [water, setWater] = useState(false);
  const [food, setFood] = useState(false);
  const [drink, setDrink] = useState(false);
  const [clicked, setClicked] = useState(false);

  const SelectToilet = () => {
    if (document.getElementById('toilet_yes')) {
      document.getElementById('toilet_yes').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('toilet_yes').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('toilet_yes').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectNoToilet = () => {
    if (document.getElementById('toilet_no')) {
      document.getElementById('toilet_no').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('toilet_no').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('toilet_no').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectParking = () => {
    if (document.getElementById('parking_yes')) {
      document.getElementById('parking_yes').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('parking_yes').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('parking_yes').style.backgroundColor =
          '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectNoParking = () => {
    if (document.getElementById('parking_no')) {
      document.getElementById('parking_no').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('parking_no').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('parking_no').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectWater = () => {
    if (document.getElementById('water_yes')) {
      document.getElementById('water_yes').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('water_yes').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('water_yes').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectNoWater = () => {
    if (document.getElementById('water_no')) {
      document.getElementById('water_no').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('water_no').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('water_no').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectFood = () => {
    if (document.getElementById('food_yes')) {
      document.getElementById('food_yes').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('food_yes').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('food_yes').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectNoFood = () => {
    if (document.getElementById('food_no')) {
      document.getElementById('food_no').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('food_no').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('food_no').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectDrink = () => {
    if (document.getElementById('drink_yes')) {
      document.getElementById('drink_yes').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('drink_yes').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('drink_yes').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  const SelectNoDrink = () => {
    if (document.getElementById('drink_no')) {
      document.getElementById('drink_no').style.backgroundColor = '#E3FFE0';
      setClicked(true);
      if (clicked === true) {
        document.getElementById('drink_no').style.backgroundColor =
          'transparent';
        setClicked(false);
      } else {
        document.getElementById('drink_no').style.backgroundColor = '#E3FFE0';
        setClicked(true);
      }
    }
  };

  //단어를 입력하고 엔터를 누르면 해시태그 생성하는 키 프레스 이벤트
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      // onCreateHashtag();
    }
  };

  return (
    <div>
      <Header />
      <Div>
        <IntroDiv>
          <TitleContainer>
            <ReviewTitle>{location.state.mountain}</ReviewTitle>
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
              <YesBtn
                id="toilet_yes"
                onClick={() => {
                  SelectToilet();
                  setToilet(true);
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="toilet_no"
                onClick={() => {
                  SelectNoToilet();
                  setToilet(false);
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="parking_yes"
                onClick={() => {
                  SelectParking();
                  setParking(true);
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="parking_no"
                onClick={() => {
                  SelectNoParking();
                  setParking(false);
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="water_yes"
                onClick={() => {
                  SelectWater();
                  setWater(true);
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="water_no"
                onClick={() => {
                  SelectNoWater();
                  setWater(false);
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="food_yes"
                onClick={() => {
                  SelectFood();
                  setFood(true);
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="food_no"
                onClick={() => {
                  SelectNoFood();
                  setFood(false);
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="drink_yes"
                onClick={() => {
                  SelectDrink();
                  setDrink(true);
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="drink_no"
                onClick={() => {
                  SelectNoDrink();
                  setDrink(false);
                }}
              >
                NO
              </NoBtn>
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
