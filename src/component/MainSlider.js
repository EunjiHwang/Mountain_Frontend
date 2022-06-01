import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { forwardRef } from 'react'; 

import Slide from './Slide';
import useScroll from '../hooks/useScroll';

import mountain1 from './assets/mountain1.jpg';
import mountain2 from './assets/mountain2.jpg';
import mountain3 from './assets/mountain3.jpg';
import rightArrow from './assets/right-arrow.png';
import leftArrow from './assets/left-arrow.png';
import { useNavigate } from 'react-router-dom';


const Background = styled.div`
  width: 1000px;
  height: 550px;
  border: 0;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  display: flex;
  margin: auto;
  margin-top: 500px;
  margin-bottom: 180px;
`;

const Image = styled.div`
  width: 430px;
  margin: auto;
  height: 350px;
  overflow: hidden; // 선을 넘어간 이미지들은 숨겨줍니다.
  border-radius: 10px;
  margin: 100px 0 0 20px;
`;

const SliderContainer = styled.div`
  margin: 0 auto;
  display: flex; // 이미지들을 가로로 나열합니다.
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 300px;
  height: 80px;
  margin: 100px 0 0 40px;
`;

const MountainName = styled.span`
  font-weight: 600;
  font-size: 26px;
  color: black;
`;

const HashTag = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0404B4;
  margin-top: 15px;
`;

const TotalStar = styled.span`
  width: 50px;
  height: 50px;
  margin-left: 40px;
  font-size: 20px;
  font-weight: 600;
  color: #DF7401;
`;

const ReviewContainer = styled.div`
  width: 350px;
  height: 270px;
  margin-left: 40px;
  padding: 3px;
`;

const ReviewTitle = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin-left:5px;
`;

const MoreBtn = styled.button`
  width: 80px;
  height: 26px;
  background-color: transparent;
  border-radius: 8px;
  border: 1.5px solid black;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  margin-left: 180px;
`;

const UnderBar = styled.div`
  height: 1px;
  width: 340px;
  border-bottom: 2px solid #707070;
  margin: 5px 5px;
`;

const PrevBtn = styled.img`
  all: unset;
  width: 40px;
  height: 40px;
  background: transparent;
  opacity: 0.7;
  border: 0px;
  margin: 240px 0 0 20px;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
  }
`;

const NextBtn = styled.img`
  all: unset;
  width: 40px;
  height: 40px;
  background: transparent;
  opacity: 0.7;
  border: 0px;
  margin: 240px 0 0 20px;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
  }
`; 

const ReviewItem = styled.div`
  width: 320px;
  height: 60px;
  margin-left: 10px;
  padding: 5px;
`;

const UserName = styled.span`
  font-size: 13px;
  font-weight: 600;
`;

const Rate = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin: 0 20px;
`;

const Date = styled.span`
  font-size: 12px;
  margin: 0 20px;
`;

const ReviewContext = styled.div`
  font-size: 13px;
  margin-top: 7px;
`;

const TOTAL_SLIDES = 2; 

const MainSlider = forwardRef((props, ref) => {

  const AnimationArray = [
    { id: 1, animation: useScroll('up', 2, 0) },
  ];

  const navigate = useNavigate();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // 더 알아보기 버튼 onClick
  const onClickMore = () => {
    navigate('/map');
  };

  // 슬라이드 이동하는 버튼 이벤트 함수 onClick={NextSlide/PrevSlide}
  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES); // 마지막 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);

  return (
    <Background {...AnimationArray[0].animation}>
      <PrevBtn src={leftArrow} onClick={PrevSlide} />
      <Image>
        <SliderContainer ref={slideRef}>
          <Slide img={mountain1} />
          <Slide img={mountain2} />
          <Slide img={mountain3} />
        </SliderContainer>
      </Image>
      <ContentContainer>
        <TitleContainer>
          <MountainName>도봉산</MountainName>
          <TotalStar>3.0/5.0</TotalStar>
          <HashTag>#서울 #먹거리</HashTag>
        </TitleContainer>
        <ReviewContainer>
          <ReviewTitle>Review</ReviewTitle>
          <MoreBtn onClick={onClickMore}>더 알아보기 &gt;</MoreBtn>
          <UnderBar />
          <ReviewItem>
            <UserName>캡스톤</UserName>
            <Rate>4.0/5.0</Rate>
            <Date>2022-06-01</Date>
            <ReviewContext>가까운 곳에 산이~~ 언제나 갈 수 있는 거리에 산이 있어서 너무 좋아요</ReviewContext>
          </ReviewItem>
          <UnderBar />
          <ReviewItem>
            <UserName>김다은</UserName>
            <Rate>4.0/5.0</Rate>
            <Date>2022-05-31</Date>
            <ReviewContext>심할 때 다녀오기 좋은 산 같아요~</ReviewContext>
          </ReviewItem>
          <UnderBar />
          <ReviewItem>
            <UserName>테스트계정</UserName>
            <Rate>3.0/5.0</Rate>
            <Date>2022-05-30</Date>
            <ReviewContext>저랑 도봉산 등산가실 분~~!</ReviewContext>
          </ReviewItem>
          <UnderBar />
        </ReviewContainer>
      </ContentContainer>
      <NextBtn src={rightArrow} onClick={NextSlide} />
    </Background>
  );
});


export default MainSlider;