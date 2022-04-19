import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  margin-top: auto;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
  background-color: #4C8969;
`;

const MountainLogo = styled.div`
  font-size: 15px;
  color: white;
  margin-top: 15px;
`;

const FrontContainer = styled.div`
  margin: 5px 0 0 30px;
  color: white;
  text-decoration: none;
`;

const BackContainer = styled.div`
  margin: 5px 0 0 10px;
`;

function Footer() {
  return (
    <FooterWrapper>
      <MountainLogo>@다녀왔산!</MountainLogo>
      <FrontContainer>
        <a
          href='https://github.com/qkrthdus605/Mountain_Frontend'
          target='_blank'
          rel='noreferrer'
        >Frontend
        </a>
      </FrontContainer>
      <BackContainer>
        <a
          href='https://github.com/NYeonK/hiking'
          target='_blank'
          rel='noreferrer'
        >Backend
        </a>
      </BackContainer>
    </FooterWrapper>
  );
}

export default Footer;