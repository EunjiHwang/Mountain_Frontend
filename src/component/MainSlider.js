import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Slide from './Slide';
import img1 from './assets/1.jpg';
import img2 from './assets/1.jpg';
import img3 from './assets/1.jpg';

const Wrapper = styled.div`
  height: 100vh;
  background-color: transparent;
`;

const Container = styled.div`
  width: 1000px;
  height: 550px;
  border: 2px solid #707070;
  background-color: rgba(255, 255, 255, 0.7);
  /* opacity: 0.7; */
  border-radius: 20px;
  display: flex;
  margin: auto;
  margin-top: 500px;
`;

const Image = styled.div`
  width: 430px;
  height: 350px;
  border-radius: 10px;
  margin: 100px 0 0 90px;
  display: flex;
  justify-content: center;
  overflow: hidden; // 선을 넘어간 이미지들은 숨겨줍니다.
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
  color: black;
  margin-top: 15px;
`;

const TotalStar = styled.span`
  width: 50px;
  height: 50px;
  margin-left: 40px;
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

const TOTAL_SLIDES = 2; 

function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);


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
    <Wrapper>
      <Container>
        <Image>
          <SliderContainer ref={slideRef}>
            <Slide img={img1} />
            <Slide img={img2} />
            <Slide img={img3} />
          </SliderContainer>
        </Image>
        <ContentContainer>
          <TitleContainer>
            <MountainName>산이름</MountainName>
            <TotalStar>별점 자리</TotalStar>
            <HashTag>#해시태그</HashTag>
          </TitleContainer>
          <ReviewContainer>
            <ReviewTitle>Review</ReviewTitle>
            <MoreBtn>더 알아보기 ></MoreBtn>
            <UnderBar />
          </ReviewContainer>
        </ContentContainer>
      </Container>
    </Wrapper>  
  );
}


export default MainSlider;