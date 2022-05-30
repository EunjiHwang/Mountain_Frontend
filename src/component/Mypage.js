/*global kakao */
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Mnt from './assets/mypage_mnt.png';
import styled from 'styled-components';
import { GoPencil } from 'react-icons/go';
import { MdMessage } from 'react-icons/md'; // 내가 작성한 글
import { GoComment } from 'react-icons/go'; // 내가 작성한 후기
import { MdSpeakerNotes } from 'react-icons/md'; // 내가 작성한 댓글
import { MdChevronRight } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllPage = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

const Info = styled.div`
  float: left;
  margin-left: 2%;
  margin-right: 2%;
  width: 20%;
  height: 80%;
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
  background: url(${(props) => props.img}) no-repeat center center;
  background-size: 100% 100%;
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
  margin-left: 2%;
  margin-rithg: 2%;
  width: 35%;
  height: 70%;
`;

const UserFunction = styled.div`
  float: right;
  width: 27%;
  height: 80%;
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

function Mypage(props) {
  const [userName, setUserName] = useState('');
  const [numReview, setNumReview] = useState(0);
  const [userLevel, setUserLevel] = useState('');
  const [levelUrl, setLevelUrl] = useState('');
  const [len, setLen] = useState(0);
  const navigate = useNavigate();
  const onClickReview = () => {
    navigate('/myreview');
  };

  const onClickComment = () => {
    navigate('/mycomment');
  };

  const onClickWriting = () => {
    navigate('/mywriting');
  };

  const setLevelName = (level) => {
    if (level === 1) {
      setUserLevel('시작한닭');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/2431/2431640.png');
    } else if (level >= 2 && level <= 5) {
      setUserLevel('등린이');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/7226/7226210.png');
    } else if (level >= 6 && level <= 8) {
      setUserLevel('등시생');
      setLevelUrl(
        'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653755646~hmac=77328d2dfdf657a09220a7b01afa2b00'
      );
    } else if (level >= 9 && level <= 10) {
      setUserLevel('잘탄닭');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/7309/7309075.png');
    }
  };
  useEffect(() => {
    mapscript();
  });

  const mapscript = () => {
    var map = new kakao.maps.Map(document.getElementById('map'), {
      // 지도를 표시할 div
      center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
      level: 14, // 지도의 확대 레벨
    });
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    fetch('http://54.208.255.25:8080/api/mypage/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: localStorage.getItem('userId'),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserName(res.user.name);
        setNumReview(res.user.review);
        setLevelName(res.user.level);
        setLen(res.mountains.length);

        var imageSrc =
          'https://cdn-icons-png.flaticon.com/512/2107/2107845.png';
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(30, 30);
        for (var i = 0; i < res.mountains.length; i++) {
          // console.log('good');
          const name = res.mountains[i].name;
          localStorage.setItem('name', res.mountains[i].name);
          // 마커 이미지를 생성합니다
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          var latlng = new kakao.maps.LatLng(
            res.mountains[i].latitude,
            res.mountains[i].longitude
          );
          let marker = new kakao.maps.Marker({
            map: map,
            position: latlng,
            // title: mnt.mountain.title,
            image: markerImage,
          });
          var content = document.createElement('div');
          content.style.cssText =
            'width: 250px; height: 200px; background: white; border-radius: 10px;';
          content.onclick = function () {
            navigate('/map', { state: name });
            console.log('click');
          };
          var topDiv = document.createElement('div');
          topDiv.style.cssText =
            'width: 250px; height: 30px; border-radius: 10px 10px 0 0; background: #afafaf; text-align: center; color: white; font-size: 20px; line-height: 28px; font: normal normal 600 19px Segoe UI';
          topDiv.innerHTML = res.mountains[i].name;
          var topBtn = document.createElement('button');
          topBtn.onClick = function () {
            customOverlay.setMap(null);
            console.log('클릭');
          };
          topBtn.innerHTML = 'X';
          // topBtn.onClick = closeOverlay();
          topBtn.style.cssText =
            'float: right; background: none; border: none; fone-size: 10px;';
          topDiv.appendChild(topBtn);
          content.appendChild(topDiv);
          var img = document.createElement('img');
          img.style.cssText = 'width: 100%; height: 135px;';
          img.src = res.mountains[i].image;
          content.appendChild(img);
          var bottomDiv = document.createElement('div');
          bottomDiv.style.cssText =
            'line-height: 26px; font: normal normal 600 18px Segoe UI';
          bottomDiv.innerHTML = res.mountains[i].hashtags;
          content.appendChild(bottomDiv);
          let customOverlay = new kakao.maps.CustomOverlay({
            position: latlng,
            content: content,
          });
          kakao.maps.event.addListener(marker, 'click', function () {
            customOverlay.setMap(map);
          });
        }
      });
  };

  return (
    <div>
      <AllPage>
        <Header />
        <Info>
          <UserInfo>
            <UserImg></UserImg>
            <UserName>{userName}</UserName>

            <Level>
              <UserLevelImg img={levelUrl} />
              <UserLevel>{userLevel}</UserLevel>
              <UserLevelBar />
            </Level>
            <UserLevelDetail>
              <DetailImg src={Mnt}></DetailImg>
              <DetailInfo>
                <LineHeight />
                <LineWidth />
                <DetailText size="18px" left="2px" top="14px">
                  등산한 산
                </DetailText>
                <DetailText size="18px" left="5px" top="54px">
                  후기개수
                </DetailText>
                <DetailText size="22px" left="115px" top="11px">
                  {len}
                </DetailText>
                <DetailText size="22px" left="115px" top="51px">
                  {numReview}
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
          <MyPost onClick={onClickWriting}>
            <MdMessage className="img" />
            내가 작성한 글
            <MdChevronRight className="icon" />
          </MyPost>
          <MyPost onClick={onClickComment}>
            <MdSpeakerNotes className="img" />
            내가 작성한 댓글
            <MdChevronRight className="icon" />
          </MyPost>
          <MyPost onClick={onClickReview}>
            <GoComment className="img" />
            내가 작성한 후기
            <MdChevronRight className="icon" />
          </MyPost>
        </UserFunction>

        <Footer />
      </AllPage>
    </div>
  );
}

export default Mypage;
