/*global kakao */
import Header from './Header';
import Footer from './Footer';
import MountainInfo from './MountainInfo';
import { Link } from 'react-router-dom';
import Mnt from './assets/mypage_mnt.png';
import styled from 'styled-components';
import { GoPencil } from 'react-icons/go';
import { MdMessage } from 'react-icons/md'; // 내가 작성한 글
import { GoComment } from 'react-icons/go'; // 내가 작성한 후기
import { MdSpeakerNotes } from 'react-icons/md'; // 내가 작성한 댓글
import { MdChevronRight } from 'react-icons/md';
import React, { useEffect } from 'react';

const AllPage = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const Info = styled.div`
  float: left;
  // width: 400px;
  margin-left: 2%;
  margin-right: 2%;
  width: 20%;
  height: 80%;
  // border: 1px solid black;
  padding-top: 3%;
`;

const UserInfo = styled.div`
  width: 350px;
  height: 470px;
  margin: auto;
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
`;

const DetailImg = styled.img`
  float: left;
  margin-left: 6%;
  width: 34%;
  height: 100%;
  background: url(./public/mypage_mnt.png);
`;

const DetailInfo = styled.div`
  position: relative;
  float: right;
  margin-right: 6%;
  width: 50%;
  height: 100%;
`;

const LineWidth = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  height: 0;
  border: 0.1px dashed #707070;
`;

const LineHeight = styled.div`
  position: absolute;
  left: 50%;
  width: 0px;
  height: 100%;
  border: 0.1px dashed #707070;
`;

const DetailText = styled.div`
  position: absolute;
  text-align: center;
  font: normal normal bold 19px Segoe UI;
  letter-spacing: 0px;
  color: #a0a0a0;

  font-size: ${(props) => props.size};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;

const EditInfo = styled.div`
  font: normal normal bold 23px Segoe UI;
  color: #a0a0a0;
  text-align: center;
  background: none;
  border: none;
  margin-top: 10px;
`;

const UserMap = styled.div`
  display: inline-block;
  position: relative;
  top: 5%;
  // width: 600px;
  margin-left: 2%;
  margin-rithg: 2%;
  width: 35%;
  height: 70%;
  // border: 1px solid black;
`;

const UserFunction = styled.div`
  float: right;
  // width: 500px;
  width: 33%;
  height: 80%;
  // border: 1px solid black;
  padding-top: 3%;
`;

const MyPost = styled.button`
  text-align: left;
  font: normal normal 600 20px Segoe UI;
  color: #707070;
  width: 70%;
  height: 43px;
  border-radius: 17px;
  border: 3px solid #707070;
  box-shadow: 0px 3px 6px #00000029;
  line-height: 180%;
  margin: 8px;
  margin-left: -60px;
  background: white;

  .img {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 27px;
    margin-bottom: 5px;
  }

  .icon {
    float: right;
    font-size: 28px;
    margin: 4px;
  }
`;

function Mypage() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    // let container = document.getElementById('map');

    // const options = {
    //   center: new kakao.maps.LatLng(37.2231, 127.1873),
    //   level: 14,
    // };

    // // 지도 생성
    // const map = new kakao.maps.Map(container, options);

    var map = new kakao.maps.Map(document.getElementById('map'), {
      // 지도를 표시할 div
      center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
      level: 14, // 지도의 확대 레벨
    });

    // // 마커 클러스터러를 생성합니다
    // var clusterer = new kakao.maps.MarkerClusterer({
    //   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    //   minLevel: 10, // 클러스터 할 최소 지도 레벨
    // });

    // // 데이터를 가져오기 위해 jQuery를 사용합니다
    // // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
    // $.get('/download/web/data/chicken.json', function (data) {
    //   // 데이터에서 좌표 값을 가지고 마커를 표시합니다
    //   // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
    //   var markers = $(data.positions).map(function (i, position) {
    //     return new kakao.maps.Marker({
    //       position: new kakao.maps.LatLng(position.lat, position.lng),
    //     });
    //   });

    //   // 클러스터러에 마커들을 추가합니다
    //   clusterer.addMarkers(markers);
    // });
  };

  return (
    <div>
      <AllPage>
        <Header />
        <Info>
          <UserInfo>
            <UserImg id="userimg"></UserImg>
            <UserName id="username">홍길동</UserName>

            <Level>
              <UserLevelImg id="userlevelimg" />
              <UserLevel id="userlevel">등산고수</UserLevel>
              <UserLevelBar />
            </Level>
            <UserLevelDetail>
              <DetailImg src={Mnt}></DetailImg>
              <DetailInfo>
                <LineHeight />
                <LineWidth />
                <DetailText size="18px" left="5px" top="14px">
                  등산횟수
                </DetailText>
                <DetailText size="18px" left="5px" top="54px">
                  오른높이
                </DetailText>
                <DetailText size="22px" left="115px" top="11px">
                  3
                </DetailText>
                <DetailText size="20px" left="95px" top="51px">
                  4,198
                </DetailText>
              </DetailInfo>
            </UserLevelDetail>
          </UserInfo>
          <Link to="/editme">
            <EditInfo>
              <GoPencil />
              &nbsp;정보수정
            </EditInfo>
          </Link>
        </Info>

        <UserMap id="map">{/* <MountainInfo /> */}</UserMap>

        <UserFunction>
          <Link to="/map">
            <MyPost>
              <MdMessage className="img" />
              내가 작성한 글
              <MdChevronRight className="icon" />
            </MyPost>
          </Link>
          <Link to="/map">
            <MyPost>
              <MdSpeakerNotes className="img" />
              내가 작성한 댓글
              <MdChevronRight className="icon" />
            </MyPost>
          </Link>
          <Link to="/map">
            <MyPost>
              <GoComment className="img" />
              내가 작성한 후기
              <MdChevronRight className="icon" />
            </MyPost>
          </Link>
        </UserFunction>

        <Footer />
      </AllPage>
    </div>
  );
}

export default Mypage;
