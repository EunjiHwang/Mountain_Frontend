import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  min-width: 100%;
  height: 100vh;
  background: url(${'../img/Background.png'});
  background-repeat: none;
  background-size: cover;
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
  font-size: 28px;
  text-align: center;
`;

function Main() {
  return (
    <Background>
      <LogoContainer>
        <LogoText>燈山</LogoText>
      </LogoContainer>
      <SubContainer>
        <SubText>등산을 좋아하는 사람들이 모여 소통하는 공간</SubText>
        <SubText>등산 커뮤니티 서비스, 燈山</SubText>
      </SubContainer>
    </Background>
  );
}

export default Main;
