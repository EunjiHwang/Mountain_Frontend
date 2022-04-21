import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: #4C8969;
  position: absolute;
  bottom: 0;
`;

const MountainLogo = styled.div`
  font-size: 13px;
  color: white;
  margin: 3px 0;
`;

const FrontContainer = styled.a`
  margin: 3px 0;
  color: white;
  text-decoration: none;
  font-size: 13px;
`;

const BackContainer = styled.a`
  margin: 3px 0;
  color: white;
  text-decoration: none;
  font-size: 13px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <MountainLogo>@다녀왔산!</MountainLogo>
      <BackContainer
        href='https://github.com/NYeonK/hiking'
        target='_blank'
        rel='noreferrer'
      >https://github.com/NYeonK/hiking
      </BackContainer>
      <FrontContainer
        href='https://github.com/qkrthdus605/Mountain_Frontend'
        target='_blank'
        rel='noreferrer'
      >https://github.com/qkrthdus605/Mountain_Frontend
      </FrontContainer>
    </FooterWrapper>
  );
}

export default Footer;