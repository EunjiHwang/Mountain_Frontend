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
import { $CombinedState } from 'redux';

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
  const [mnt, setMnt] = useState([]);
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
      setUserLevel('준비생');
      setLevelUrl(
        'https://cdn-icons.flaticon.com/png/512/5961/premium/5961652.png?token=exp=1653242741~hmac=93651bc5376b5af1c4791bf40e4cf835'
      );
      setUserLevel('등린이');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/7226/7226210.png');
      setUserLevel('등시생');
      setLevelUrl(
        'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653242691~hmac=1fa7d1f6f501536ba5d2e6711f92fb1e'
      );
      setUserLevel('등산고수');
      setLevelUrl('https://cdn-icons-png.flaticon.com/512/7309/7309075.png');
      //   setUserLevel(function () {
      //     return '준비생';
      //   });
      //   setLevelUrl(function () {
      //     return 'https://cdn-icons.flaticon.com/png/512/5961/premium/5961652.png?token=exp=1653242741~hmac=93651bc5376b5af1c4791bf40e4cf835';
      //   });
      // } else if (level >= 2 && level <= 5) {
      //   setUserLevel(function () {
      //     return '등린이';
      //   });
      //   setLevelUrl(function () {
      //     return 'https://cdn-icons-png.flaticon.com/512/7226/7226210.png';
      //   });
      // } else if (level >= 6 && level <= 8) {
      //   setUserLevel(function () {
      //     return '등시생';
      //   });
      //   setLevelUrl(function () {
      //     return 'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653242691~hmac=1fa7d1f6f501536ba5d2e6711f92fb1e';
      //   });
      // } else if (level >= 9 && level <= 10) {
      //   setUserLevel(function () {
      //     return '등산고수';
      //   });
      //   setLevelUrl(function () {
      //     return 'https://cdn-icons-png.flaticon.com/512/7309/7309075.png';
      //   });
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
  };

  fetch('/api/mypage/main', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // _id: userId,
      _id: localStorage.getItem('userId'),
      // _id: '627b8dccbb97cafec9e32628',
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log('success');
      }
    })
    .then((error) => {
      console.log('error');
      // 임시
      const state = {
        mountains: [
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

      setMnt(function () {
        return state;
      });

      var level = 9;
      setLevelName(level);

      // 임시 데이터
      setUserName(function () {
        return '등산은 내가 한다';
      });
      setNumReview(function () {
        return 3;
      });

      // console.log(mnt.mountains.length);

      // for (var i = 0; i < mnt.moutains.length; i++) {
      //   console.log('반복문');
      // }
    });

  // var map;
  // useEffect(() => {
  //   mapscript();
  //   // setUserId((id) => (id = localStorage.getItem('userId')));
  //   console.log(userId);

  //   console.log('왜 안돼');
  //   console.log(len);

  //   // 마커 이미지의 이미지 주소입니다
  //   // var imageSrc = 'https://cdn-icons-png.flaticon.com/512/2107/2107845.png';
  //   // for (var i = 0; i < mnt.mountains.length; i++) {
  //   //   console.log('반복문');
  //   //   // 마커 이미지의 이미지 크기 입니다
  //   //   var imageSize = new kakao.maps.Size(30, 30);
  //   //   // 마커 이미지를 생성합니다
  //   //   var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  //   //   var latlng = new kakao.maps.LatLng(
  //   //     mnt.mountain[i].latitude,
  //   //     mnt.mountain[i].longitude
  //   //   );

  //   //   let marker = new kakao.maps.Marker({
  //   //     map: map,
  //   //     position: latlng,
  //   //     // title: mnt.mountain.title,
  //   //     image: markerImage,
  //   //   });

  //   //   // let content =
  //   //   //   '<div style="width: 250px; height: 200px; background: white; border-radius: 10px;">' +
  //   //   //   '<div style="width: 250px; height: 30px; border-radius: 10px 10px 0 0; background: #afafaf; text-align: center; color: white; font-size: 20px; line-height: 28px;">' +
  //   //   //   mnt.mountain[i].name +
  //   //   //   '<button type="button" onClick="closeOverlay()" title="닫기" style="float: right; background: white; border: none; fone-size: 10px;">' +
  //   //   //   'X' +
  //   //   //   '</button>' +
  //   //   //   '</div>' +
  //   //   //   '<div>' +
  //   //   //   '<div>' +
  //   //   //   '<img style = "width: 100%; height: 135px;" src="' +
  //   //   //   mnt.mountain[i].image +
  //   //   //   '">' +
  //   //   //   '<img />' +
  //   //   //   '</div>' +
  //   //   //   '<div style = "line-height: 26px;">' +
  //   //   //   '#충청남도 #청양 #얼음분수' +
  //   //   //   '</div>' +
  //   //   //   '</div>' +
  //   //   //   '</div>';

  //   //   var content = document.createElement('div');
  //   //   content.style.cssText =
  //   //     'width: 250px; height: 200px; background: white; border-radius: 10px;';

  //   //   var topDiv = document.createElement('div');
  //   //   topDiv.style.cssText =
  //   //     'width: 250px; height: 30px; border-radius: 10px 10px 0 0; background: #afafaf; text-align: center; color: white; font-size: 20px; line-height: 28px;';
  //   //   topDiv.innerHTML = mnt.mountain[i].name;

  //   //   var topBtn = document.createElement('button');
  //   //   topBtn.innerHTML = 'X';
  //   //   topBtn.onClick = function () {
  //   //     customOverlay.setMap();
  //   //   };

  //   //   topBtn.style.cssText =
  //   //     'float: right; background: none; border: none; fone-size: 10px;';
  //   //   topDiv.appendChild(topBtn);
  //   //   content.appendChild(topDiv);

  //   //   var img = document.createElement('img');
  //   //   img.style.cssText = 'width: 100%; height: 135px;';
  //   //   img.src = mnt.mountain[i].image;
  //   //   content.appendChild(img);

  //   //   var bottomDiv = document.createElement('div');
  //   //   bottomDiv.style.cssText = 'line-height: 26px;';
  //   //   bottomDiv.innerHTML = '#' + mnt.mountain[i].hashtag;
  //   //   content.appendChild(bottomDiv);

  //   //   let customOverlay = new kakao.maps.CustomOverlay({
  //   //     position: latlng,
  //   //     content: content,
  //   //   });

  //   //   kakao.maps.event.addListener(marker, 'click', function () {
  //   //     customOverlay.setMap(map);
  //   //   });
  //   // }
  // });

  // const mapscript = () => {
  //   map = new kakao.maps.Map(document.getElementById('map'), {
  //     // 지도를 표시할 div
  //     center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
  //     level: 14, // 지도의 확대 레벨
  //   });

  //   // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  //   var zoomControl = new kakao.maps.ZoomControl();
  //   map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  //   fetch('/api/mypage/main', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       // _id: userId,
  //       _id: localStorage.getItem('userId'),
  //       // _id: '627b8dccbb97cafec9e32628',
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.success) {
  //         console.log(res);
  //         setUserName(res.user.name);
  //         setNumReview(res.user.review);
  //         const initMntData = res.mountains.map((it) => {
  //           return {
  //             _id: it._id,
  //             name: it.name,
  //             address: it.address,
  //             avgRating: it.avgRating,
  //             facility: it.facility,
  //             count: it.count,
  //             hashtag: it.hashtag,
  //             latitude: it.latitude,
  //             longitude: it.longitude,
  //             __v: it.__v,
  //           };
  //         });
  //         // setMnt(function () {
  //         //   return initMntData;
  //         // });
  //         setMnt(initMntData);
  //         const level = res.user.level;
  //         if (level === 1) {
  //           setUserLevel((prevLevel) => {
  //             return '준비생';
  //           });
  //           setLevelUrl((prevUrl) => {
  //             return 'https://cdn-icons.flaticon.com/png/512/5961/premium/5961652.png?token=exp=1653242741~hmac=93651bc5376b5af1c4791bf40e4cf835';
  //           });
  //         } else if (level >= 2 && level <= 5) {
  //           setUserLevel((prevLevel) => {
  //             return '등린이';
  //           });
  //           setLevelUrl((prevUrl) => {
  //             return 'https://cdn-icons-png.flaticon.com/512/7226/7226210.png';
  //           });
  //         } else if (level >= 6 && level <= 8) {
  //           setUserLevel((prevLevel) => {
  //             return '등시생';
  //           });
  //           setLevelUrl((prevUrl) => {
  //             return 'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653242691~hmac=1fa7d1f6f501536ba5d2e6711f92fb1e';
  //           });
  //         } else if (level >= 9 && level <= 10) {
  //           setUserLevel((prevLevel) => {
  //             return '등산고수';
  //           });
  //           setLevelUrl((prevUrl) => {
  //             return 'https://cdn-icons-png.flaticon.com/512/7309/7309075.png';
  //           });
  //         }
  //       }
  //     })
  //     .then((error) => {
  //       console.log('error');
  //       // 임시
  //       const state = {
  //         mountains: [
  //           {
  //             image:
  //               'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMjdfMjkg/MDAxNjE2Nzc1Mzg3MzMz.Iz_mikoWQmOabWuGaQ9YdexvJojQi-f9Gy5F3EJv3PYg.wD8x38mVgou8BuChHf-Q_Ka03GMjyFsV9gZ8v-jlZxkg.JPEG.1jungeun1/IMG_6235.jpg?type=w800',
  //             name: '함박산',
  //             hashtag: '20분 충분함',
  //             latitude: '37.21390880427653',
  //             longitude: '127.18892260082404',
  //           },
  //           {
  //             image:
  //               'https://www.ui4u.go.kr/tour/img/content/img_mountain_pic02.png',
  //             name: '함박산',
  //             hashtag: '서울근교',
  //             latitude: '37.69884206393718',
  //             longitude: '127.01545859321786',
  //           },
  //         ],
  //       };

  //       setMnt(function () {
  //         return state;
  //       });

  //       // setLen(function () {
  //       //   return mnt.mountain.length;
  //       // });

  //       var level = 9;

  //       if (level === 1) {
  //         setUserLevel(function () {
  //           return '준비생';
  //         });
  //         setLevelUrl(function () {
  //           return 'https://cdn-icons.flaticon.com/png/512/5961/premium/5961652.png?token=exp=1653242741~hmac=93651bc5376b5af1c4791bf40e4cf835';
  //         });
  //       } else if (level >= 2 && level <= 5) {
  //         setUserLevel(function () {
  //           return '등린이';
  //         });
  //         setLevelUrl(function () {
  //           return 'https://cdn-icons-png.flaticon.com/512/7226/7226210.png';
  //         });
  //       } else if (level >= 6 && level <= 8) {
  //         setUserLevel(function () {
  //           return '등시생';
  //         });
  //         setLevelUrl(function () {
  //           return 'https://cdn-icons.flaticon.com/png/512/2632/premium/2632844.png?token=exp=1653242691~hmac=1fa7d1f6f501536ba5d2e6711f92fb1e';
  //         });
  //       } else if (level >= 9 && level <= 10) {
  //         setUserLevel(function () {
  //           return '등산고수';
  //         });
  //         setLevelUrl(function () {
  //           return 'https://cdn-icons-png.flaticon.com/512/7309/7309075.png';
  //         });
  //       }

  //       // 임시 데이터
  //       setUserName(function () {
  //         return '등산은 내가 한다';
  //       });
  //       setNumReview(function () {
  //         return 3;
  //       });
  //     });
  // };

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
