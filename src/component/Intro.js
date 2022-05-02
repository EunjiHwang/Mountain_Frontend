import styled from 'styled-components';
import Header from "./Header";
import Footer from "./Footer";

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
  width: 650px; height: 450px;
  position: absolute;
  padding: 20px 50px; 
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 5px 10px;
  text-align: left;
  font-weight: bold;
`

const H2 = styled.h2`
  color: #554646;
  margin-bottom: 5px;
  font-size: 20px;
`
const Span = styled.span`
  text-size: 5px;
  margin-bottom: 5px;
  text-indent: 15px;
  color: #707070;
  line-height: 160%;
`

function Intro(props) {
  
  return (
    <div>
    <Header />
    <Div>
      <IntroDiv>
        <form style={{
        display: 'flex', flexDirection: 'column'}}
        >
        <H2>소개글</H2>
        <hr width="100%" /> <br />
        <Span>본 프로젝트는 등산을 즐기는 사람들에게 편의를 제공하기 위해 고안된 프로젝트입니다. 프로젝트 이름인 ‘燈山(등산)’은 등 등, 산 산을 사용하여 산을 밝히는 프로젝트를 만들고자 하는 뜻을 담고 있습니다. 우리나라에는 산이 많고 등산을 즐기는 사람들이 많지만 등산을 위한 서비스는 아직 많이 활성화되어 있지 않습니다. 대부분 인터넷 카페로 운영되며 이 또한 폐쇄적으로 운영되는 것이 대부분입니다. 해당 프로젝트에서는 모든 사람들이 접근하기 쉽도록 누구나 사용하기 쉬운 서비스를 제작하는 데에 주안점을 두고 있습니다.</Span>
        <Span>많은 사람이 소통할 수 있는 다양한 커뮤니티 기능과 챗봇 기능, 산과 관련된 편의시설을 한 눈에 볼 수 있는 지도 기능 그 외에도 다양한 기능을 겸비한 등산하는 사람들을 위한 웹서비스를 제작하는 프로젝트입니다.</Span>
        </form>
      </IntroDiv>     
    </Div>
    <Footer />
    </div>
  );
}

export default Intro;