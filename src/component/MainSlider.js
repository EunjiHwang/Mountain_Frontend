import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Slide from './Slide';
import img1 from './assets/1.jpg';
import img2 from './assets/1.jpg';
import img3 from './assets/1.jpg';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 1000px;
  height: 550px;
  border: 2px solid #707070;
  background-color: white;
  opacity: 0.7;
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

const MountainName = styled.div`
  font-weight: 600;
  font-size: 30px;
  color: black;
  
`;

const TOTAL_SLIDES = 2; 

function MainSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // onClick={NextSlide/PrevSlide}
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
      </Container>
    </Wrapper>
  );
}


export default MainSlider;