import { useState, React, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import StarScore from './StarScore';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const [comment, setComment] = useState('');
  const [hashtag, setHashtag] = useState('');
  // yes면 true, no면 false
  const [toilet, setToilet] = useState(false);
  const [parking, setParking] = useState(false);
  const [water, setWater] = useState(false);
  const [food, setFood] = useState(false);
  const [drink, setDrink] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [star, setStar] = useState(0);

  const [facility, setFacility] = useState([
    {
      idChecked: false,
      facilityType: 'toilet',
    },
    {
      idChecked: false,
      facilityType: 'parking',
    },
    {
      idChecked: false,
      facilityType: 'water',
    },
    {
      idChecked: false,
      facilityType: 'food',
    },
    {
      isChecked: false,
      facilityType: 'drink',
    },
  ]);

  const onHashHandler = (e) => {
    setHashtag(e.target.value);
  };

  const onCommentHandler = (e) => {
    setComment(e.target.value);
  };

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

  const navigate = useNavigate();

  const onClickSave = (e) => {
    e.preventDefault();

    let facilityArray = [];

    for (let i = 0; i < 5; i++) {
      facilityArray.push(facility[i].idChecked);
    }

    let body = {
      writer: localStorage.getItem('userId'),
      mountain: location.state.mountain,
      // address: location.state.address,
      address: localStorage.getItem('address'),
      facility: facilityArray,
      rating: star,
      comment: comment,
      hashtags: hashtag,
      lat: Number(location.state.lat),
      lng: Number(localStorage.getItem('lon')),
    };

    if (body) {
      fetch('http://54.208.255.25:8080/api/review/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(body);
          if (result.message === '후기가 업로드 되었습니다!') {
            alert('후기가 등록되었습니다!');
            navigate('/map');
          } else {
            alert('후기 등록에 실패하였습니다. 내용을 확인해주세요.');
          }
        });
    }
  };

  return (
    <div>
      <Header />
      <Div>
        <IntroDiv>
          <TitleContainer>
            <ReviewTitle>{location.state.mountain}</ReviewTitle>
            <SaveBtn onClick={onClickSave}>저장</SaveBtn>
          </TitleContainer>
          <UnderBar />
          <ScoreContainer>
            <ScoreTitle>총점</ScoreTitle>
            <StarScore setStar={setStar} />
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
                value={facility[0].facilityType}
                onClick={(e) => {
                  SelectToilet();
                  setToilet(true);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: true }
                        : item
                    )
                  );
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="toilet_no"
                value={facility[0].facilityType}
                onClick={(e) => {
                  SelectNoToilet();
                  setToilet(false);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: false }
                        : item
                    )
                  );
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="parking_yes"
                value={facility[1].facilityType}
                onClick={(e) => {
                  SelectParking();
                  setParking(true);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: true }
                        : item
                    )
                  );
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="parking_no"
                value={facility[1].facilityType}
                onClick={(e) => {
                  SelectNoParking();
                  setParking(false);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: false }
                        : item
                    )
                  );
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="water_yes"
                value={facility[2].facilityType}
                onClick={(e) => {
                  SelectWater();
                  setWater(true);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: true }
                        : item
                    )
                  );
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="water_no"
                value={facility[2].facilityType}
                onClick={(e) => {
                  SelectNoWater();
                  setWater(false);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: false }
                        : item
                    )
                  );
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="food_yes"
                value={facility[3].facilityType}
                onClick={(e) => {
                  SelectFood();
                  setFood(true);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: true }
                        : item
                    )
                  );
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="food_no"
                value={facility[3].facilityType}
                onClick={(e) => {
                  SelectNoFood();
                  setFood(false);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: false }
                        : item
                    )
                  );
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
            <BtnWrapper>
              <YesBtn
                id="drink_yes"
                value={facility[4].facilityType}
                onClick={(e) => {
                  SelectDrink();
                  setDrink(true);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: true }
                        : item
                    )
                  );
                }}
              >
                YES
              </YesBtn>
              <NoBtn
                id="drink_no"
                value={facility[4].facilityType}
                onClick={(e) => {
                  SelectNoDrink();
                  setDrink(false);
                  setFacility(
                    facility.map((item) =>
                      item.facilityType === e.target.value
                        ? { ...item, idChecked: false }
                        : item
                    )
                  );
                }}
              >
                NO
              </NoBtn>
            </BtnWrapper>
          </BtnContainer>
          <CommentContainer>
            <CommentTitle>코멘트</CommentTitle>
            <Textarea
              type="text"
              placeholder="내용을 입력해주세요"
              value={comment}
              onChange={onCommentHandler}
            />
            <Hashtag
              type="text"
              placeholder="#해시태그"
              value={hashtag}
              onChange={onHashHandler}
            />
          </CommentContainer>
        </IntroDiv>
      </Div>
      <Footer />
    </div>
  );
}

export default WriteReview;
