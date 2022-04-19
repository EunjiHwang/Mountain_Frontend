import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 3px solid #4C8969;
`;

const HomeButton = styled.div`
  width: 100px;
  height: 70px;
  font-size: 50px;
  color: black;
  font-weight: 500;
  margin: 5px 5px 5px 40px;
`;

function Header() {
  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <HomeButton>燈山</HomeButton>
      </Link>
    </Wrapper>
  );
}

export default Header;
