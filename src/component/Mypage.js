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
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

function Mypage() {
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [numReview, setNumReview] = useState(0);
  const [userLevel, setUserLevel] = useState('');
  const [levelUrl, setLevelUrl] = useState('');
  const [mnt, setMnt] = useState([]);

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

  useEffect(() => {
    mapscript();
    // console.log(location);
  }, [location]);

  const mapscript = () => {
    var map = new kakao.maps.Map(document.getElementById('map'), {
      // 지도를 표시할 div
      center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
      level: 14, // 지도의 확대 레벨
    });

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    fetch('/api/mypage/main', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: '62864832f058105d60781cc7',
        // _id: '628104e1777afb7fdf078423',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res);
          setUserName(res.user.name);
          setNumReview(res.user.review);
          const level = res.user.level;
          if (level === 1) {
            setUserLevel('준비생');
            setLevelUrl(
              'https://cdn-icons.flaticon.com/png/512/5961/premium/5961652.png?token=exp=1653242741~hmac=93651bc5376b5af1c4791bf40e4cf835'
            );
          } else if (level >= 2 && level <= 5) {
            setUserLevel('등린이');
            setLevelUrl(
              'https://cdn-icons-png.flaticon.com/512/7226/7226210.png'
            );
          } else if (level >= 6 && level <= 8) {
            setUserLevel('등시생');
            setLevelUrl(
              'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653242691~hmac=1fa7d1f6f501536ba5d2e6711f92fb1e'
            );
          } else if (level >= 9 && level <= 10) {
            setUserLevel('등산고수');
            setLevelUrl(
              'https://cdn-icons-png.flaticon.com/512/7309/7309075.png'
            );
          }
          const initMntData = res.mountains.map((it) => {
            return {
              _id: it._id,
              name: it.name,
              address: it.address,
              avgRating: it.avgRating,
              facility: it.facility,
              count: it.count,
              hashtag: it.hashtag,
              latitude: it.latitude,
              longitude: it.longitude,
              __v: it.__v,
            };
          });
          setMnt(initMntData);
        }
      })
      .then((error) => {
        console.log('error');
      });

    // 임시
    var level = 9;

    if (level === 1) {
      setUserLevel('준비생');
      setLevelUrl(
        'https://cdn-icons.flaticon.com/png/512/5961/premium/5961652.png?token=exp=1653242741~hmac=93651bc5376b5af1c4791bf40e4cf835'
      );
    } else if (level >= 2 && level <= 5) {
      setUserLevel('등린이');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/7226/7226210.png');
    } else if (level >= 6 && level <= 8) {
      setUserLevel('등시생');
      setLevelUrl(
        'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653242691~hmac=1fa7d1f6f501536ba5d2e6711f92fb1e'
      );
    } else if (level >= 9 && level <= 10) {
      setUserLevel('등산고수');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/7309/7309075.png');
    }

    // 임시 데이터
    setUserName('등산은 내가 한다');
    setNumReview(3);

    const state = {
      mountain: [
        {
          image:
            'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjdfMjkg/MDAxNjE2Nzc1Mzg3MzMz.Iz_mikoWQmOabWuGaQ9YdexvJojQi-f9Gy5F3EJv3PYg.wD8x38mVgou8BuChHf-Q_Ka03GMjyFsV9gZ8v-jlZxkg.JPEG.1jungeun1/IMG_6235.jpg?type=w800',
          name: '함박산',
          hashtag: '20분 충분함',
          latitude: '37.21390880427653',
          longitude: '127.18892260082404',
        },
        {
          image:
            'https://www.ui4u.go.kr/tour/img/content/img_mountain_pic02.png',
          name: '함박산',
          hashtag: '서울근교',
          latitude: '37.69884206393718',
          longitude: '127.01545859321786',
        },
      ],
    };

    setMnt(state);

    // // 마커 이미지의 이미지 주소입니다
    // var imageSrc = 'https://cdn-icons-png.flaticon.com/512/2107/2107845.png';

    // for (var i = 0; i < mnt.mountain.length; i++) {
    //   // 마커 이미지의 이미지 크기 입니다
    //   var imageSize = new kakao.maps.Size(30, 30);

    //   // 마커 이미지를 생성합니다
    //   var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //   var latlng = new kakao.maps.LatLng(
    //     mnt.mountain[i].latitude,
    //     mnt.mountain[i].longitude
    //   );

    //   // // 마커를 생성합니다
    //   // var marker = new kakao.maps.Marker({
    //   //   map: map, // 마커를 표시할 지도
    //   //   position: latlng, // 마커를 표시할 위치
    //   //   title: mnt.mountain.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //   //   image: markerImage, // 마커 이미지
    //   // });

    //   // // 인포윈도우를 생성하고 지도에 표시합니다
    //   // var infowindow = new kakao.maps.InfoWindow({
    //   //   map: map, // 인포윈도우가 표시될 지도
    //   //   position: latlng,
    //   //   // content: '',
    //   //   // removable: true,
    //   //   kakao.maps.event.addListener(marker, 'click', function(){
    //   //     infowindow.open(map, marker);
    //   //   });
    //   // });

    //   // 마커를 생성하고 지도에 표시합니다
    //   // var marker = new kakao.maps.Marker({
    //   //   map: map,
    //   //   position: latlng,
    //   //   title: mnt.mountain.name,
    //   //   image: markerImage,
    //   // });

    //   // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    //   // // 마커에 클릭이벤트를 등록합니다
    //   // kakao.maps.event.addListener(marker, 'click', function () {
    //   //   // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    //   //   infowindow.setContent('');
    //   //   infowindow.open(map, marker);
    //   // });
    // }
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
                  {/* {mnt.length} */}
                  {mnt.length}
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
