import React, { useRef, useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import MainSlider from './MainSlider';

const Background = styled.div`
  position: absolute;
  min-width: 100%;
  height: 100vh;
  background: url(${'../img/Background.png'});
  background-repeat: none;
  background-size: cover;
  background-attachment: fixed;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40px;
  height: 160px;
  margin: 30px 0 0 30px;
`;

const LogoText = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: white;
  display: flex;
`;

const SubContainer = styled.div`
  align-items: center;
  margin-top: 200px;
`;

const SubText = styled.div`
  font-weight: 600;
  color: white;
  font-size: 30px;
  text-align: center;
  margin-bottom: 18px;
`;

const MenuTap = styled.div`
  width: 700px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 60px 0 0 390px;
`;

const IconWrap = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 30px;
  display: flex;
  background-color: white;
  opacity: 50%;
  margin-left: 20px;
  position: relative;
`;

const ToggleMenu = styled.div`
  display: block;
  position: absolute;
  top: 25px;
  right: 30px;
  font-size: 25px;
  color: #ffffff;
  cursor: pointer;
`;

const HamburgerMenu = styled.div`
  width: 40px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  span {
    display: block;
    position: absolute;
    left: 0;
    height: 3px;
    width: 100%;
    background: #fff;
    border-radius: 9px;
    opacity: 1;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }
  span:nth-child(1) {
    top: 0px;
  }
  span:nth-child(2) {
    top: 10px;
  }
  span:nth-child(3) {
    top: 20px;
  }
`;


const Main = forwardRef((props, ref) => {

  const toggleRefTop = useRef();
  const toggleRefMid = useRef();
  const toggleRefBottom = useRef();

  const [isToggled, setIsToggled] = useState(false);

  const handleToggleMenu = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    if (isToggled) {
      toggleRefTop.current.style.transform = 'rotate(135deg)';
      toggleRefTop.current.style.top = '10px';
      toggleRefMid.current.style.left = '-60px';
      toggleRefMid.current.style.opacity = '0';
      toggleRefBottom.current.style.top = '10px';
      toggleRefBottom.current.style.transform = 'rotate(-135deg)';
    } else {
      toggleRefTop.current.style.transform = 'rotate(0)';
      toggleRefTop.current.style.top = '0';
      toggleRefMid.current.style.left = '0';
      toggleRefMid.current.style.opacity = '1';
      toggleRefBottom.current.style.top = '20px';
      toggleRefBottom.current.style.transform = 'rotate(0)';
    }
  }, [isToggled]);

  return (
    <Background>
      <LogoContainer>
        <LogoText>燈山</LogoText>
      </LogoContainer>
      <ToggleMenu onClick={handleToggleMenu}>
        <HamburgerMenu>
          <span ref={toggleRefTop} />
          <span ref={toggleRefMid} />
          <span ref={toggleRefBottom} />
        </HamburgerMenu>
      </ToggleMenu>
      <SubContainer>
        <SubText>등산을 좋아하는 사람들이 모여 소통하는 공간</SubText>
        <SubText>등산 커뮤니티 서비스, 燈山</SubText>
      </SubContainer>
      <MenuTap>
        <IconWrap />
        <IconWrap />
        <IconWrap />
        <IconWrap />
        <IconWrap />
      </MenuTap>
      <MainSlider />
    </Background>
  );
});

export default Main;


