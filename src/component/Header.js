import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// 각 메뉴별 현재 없는 컴포넌트 라우터 설정 필요
// 드롭다운 구현 필요

const Wrapper = styled.div`
  width: 100%;
  height: 90px;
  background-color: white;
  display: flex;
  flex-direction: row;
  border-bottom: 3px solid #4c8969;
`;

const HomeButton = styled.div`
  width: 100px;
  height: 70px;
  font-size: 50px;
  color: black;
  font-weight: 500;
  margin: 18px 5px 5px 80px;
`;

const MenuList = styled.div`
  width: 500px;
  height: 40px;
  margin: 35px 0 0 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  color: black;
`;

const AuthList = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-top: 40px;
  margin-right: 30px;
`;

const AuthItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-left: 40px;
`;

const LogoutButton = styled.button`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    font-weight: 600;
    color: black;
    margin-left: 40px;
    border: 0;
    outline: 0;
    background-color: transparent;
`




function Header() {

  const navigate = useNavigate();

  const onLogout = (isLogin) => {
  
    fetch('/api/users/logout', {
      method: 'GET',
      async: false,
    })
    .then((response) => response.json())
    .then((response) => {
      // 로그아웃 성공 시
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      localStorage.setItem('isLogin', false);
      console.log(response.success);
      alert('로그아웃 되었습니다.');
      navigate('/');
    })
    .then((data) => {
      //
    });
    
  };

  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <HomeButton>燈山</HomeButton>
      </Link>
      <MenuList>
        <Link to="/intro">
          <MenuItem>소개글</MenuItem>
        </Link>
        <Link to="/community" style={{ textDecoration: 'none' }}>
          <MenuItem>커뮤니티</MenuItem>
        </Link>
        <Link to="/map" style={{ textDecoration: 'none' }}>
          <MenuItem>지도</MenuItem>
        </Link>
        <Link to="/mypage" style={{ textDecoration: 'none' }}>
          <MenuItem>마이페이지</MenuItem>
        </Link>
      </MenuList>
      {localStorage.getItem('isLogin') === 'true' ? 
        <AuthList>
          <LogoutButton onClick={() => onLogout()} style={{ textDecoration: 'none' }}>
            로그아웃
          </LogoutButton>
        </AuthList>
        :
          <AuthList>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <AuthItem>로그인</AuthItem>
          </Link>
          <Link to="/join" style={{ textDecoration: 'none' }}>
            <AuthItem>회원가입</AuthItem>
          </Link>
        </AuthList>
      }
    </Wrapper>
  );
}

export default Header;
