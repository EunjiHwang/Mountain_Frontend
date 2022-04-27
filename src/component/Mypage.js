import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { FcLandscape } from 'react-icons/fc';
import { FcSportsMode } from 'react-icons/fc';
import { GoPencil } from 'react-icons/go';

const AllPage = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const UserInfo = styled.div`
  width: 350px;
  height: 470px;
  border: 3px dashed #47444433;
  box-shadow: inset 0px 3px 6px #00000029, 0px 3px 6px #47424229;
  opacity: 1;
`;

const UserImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 1px dashed #70707063;
  opacity: 1;
  background: url('https://cdn-icons-png.flaticon.com/512/1142/1142743.png')
    no-repeat;
  background-size: 150px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 15px;
`;

const UserName = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
  font: normal normal 600 35px Segoe UI;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Level = styled.div`
  width: 100%;
  height: 60px;
  text-align: center;
  color: #336686;
  margin-bottom: 15px;
`;

const UserLevelImg = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('https://cdn-icons-png.flaticon.com/512/71/71423.png');
  background-size: 30px;
`;

const UserLevel = styled.span`
  font: normal normal bold 25px Segoe UI;
`;

const UserLevelBar = styled.div`
  display: absolute;
  width: 60%;
  height: 16px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 5px;
  background: #628fb1;
  opacity: 0.4;
`;

const UserLevelDetail = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 95px;
  border: 1px solid black;
`;

const Img = styled.div`
  display: inline-block;
  width: 25%;
  height: 90%;
  font-size: 80px;
  border: 1px solid black;
`;

const DetailInfo = styled.div`
  display: inline-block;
  width: 65%;
  height: 85%;
  border: 1px solid black;
`;

const EditInfo = styled.button`
  position: relative;
  width: 150px;
  height: 30px;
  font: normal normal bold 23px Segoe UI;
  color: #a0a0a0;
  text-align: center;
  background: white;
  border: none;
  margin-top: 15px;
`;

const Info = styled.div`
  float: left;
  // display: inline-block;
  // position: relative;
  // text-align: center;
  // width: 350px;
  // left: 5%;
  // top: 7%;
  // width: 19%;
  width: 400px;
  height: 80%;
  border: 1px solid black;
`;

const UserMap = styled.div`
  display: inline-block;
  left: 25%;
  // width: 61%;
  width: auto;
  height: 80%;
  border: 1px solid black;
`;

const UserFunction = styled.div`
  float: right;
  // width: 19%;
  width: 400px;
  height: 80%;
  border: 1px solid black;
`;

function Mypage() {
  return (
    <div>
      <AllPage>
        <Header />

        <Info>
          {/* <UserInfo>
            <UserImg id="userimg"></UserImg>
            <UserName id="username">홍길동</UserName>
            <Level>
              <UserLevelImg id="userlevelimg" />
              <UserLevel id="userlevel">등산고수</UserLevel>
              <UserLevelBar />
            </Level>
            {/* <UserLevelDetail>
              <Img>
                <FcLandscape />
              </Img>
              <DetailInfo>{/* <Rect1 /></DetailInfo>
            </UserLevelDetail> */}
          {/* </UserInfo> */}
          {/* <EditInfo>
            <GoPencil />
            &nbsp;정보수정
          </EditInfo>
           */}
        </Info>

        <UserMap></UserMap>
        <UserFunction></UserFunction>

        <Footer />
      </AllPage>
    </div>
  );
}

export default Mypage;
