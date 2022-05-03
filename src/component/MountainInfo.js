import styled from 'styled-components';
const Info = styled.div`
  position: relative;
  padding: 0;
  width: 250px;
  height: 175px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  z-index: 100;
  background: white;
`;

const InfoImg = styled.div`
  width: 100%;
  height: 69%;
  background: transparent
    url('https://post-phinf.pstatic.net/MjAyMDA1MjJfNDgg/MDAxNTkwMDc0NzM3Mjg4.wxJ1Gszpw_JTn3VbUCxrf15lJjbnOMjhhaej01ufFrQg.wAMQuEEmlNa3adQmrcJ2hDRNV4kp71cuSfHhJBGXIMMg.JPEG/50%EC%A0%95%EC%83%81_%EC%A1%B0%EB%A7%9D%28%EC%97%BD%EC%84%9C%29.jpg?type=w1200')
    0% 0% no-repeat padding-box;
  background-size: 250px 160px;
  border-radius: 10px 10px 0px 0px;
`;

const InfoText = styled.div`
  text-align: left;
  font: normal normal bold 20px Segoe UI;
  letter-spacing: 0px;
  color: #554646;
  padding-left: 10px;
  margin-top: 3px;
`;

const InfoTag = styled.div`
  text-align: left;
  font: normal normal bold 15px Segoe UI;
  letter-spacing: 0px;
  color: #707070;
  padding-left: 10px;
  padding-top: 2px;
  margin-bottom: 3px;
`;

function MountainInfo() {
  return (
    <Info>
      <InfoImg />
      <InfoText>칠갑산</InfoText>
      <InfoTag>#충청남도 #청양 #얼음분수</InfoTag>
    </Info>
  );
}

export default MountainInfo;
