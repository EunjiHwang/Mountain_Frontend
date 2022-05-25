import Header from '../Header';
import Footer from '../Footer';
import ReviewItem from './ReviewItem';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { MdSearch } from 'react-icons/md';
import { WiDayCloudy } from 'react-icons/wi';
// import { BiStar } from 'react-icons/bi'; // 빈 별
// import { ImStarFull } from 'react-icons/im'; // 꽉찬별
import { FiHeart } from 'react-icons/fi'; // 빈 하트
import { ImHeart } from 'react-icons/im'; // 꽉찬하트
import { Link } from 'react-router-dom';

const MapPage = styled.div`
  position: relative;
  height: 75vh;
`;

const MapInput = styled.div`
  position: relative;
  width: 400px;
  height: 40px;
  left: 10%;
  top: 7%;
`;

const Input = styled.input`
  position: absolute;
  width: 350px;
  height: 40px;
  border: 1px solid #707070;
  font: normal normal normal 16px Segoe UI;
  padding-left: 10px;
  border-radius: 7px;
`;

const Map = styled.div`
  position: absolute;
  z-index: 0;
  top: 5%;
  left: 10%;
  width: 80%;
  height: 95%;
`;

const Search = styled.div`
  position: relative;
  top: 6%;
  left: 20px;
  z-index: 100;
`;

const Button = styled.button`
  position: absolute;
  background-color: #ffffff;
  width: 30px;
  height: 23px;
  font-size: 1.2em;
  border: none;
  right: 13%;
  top: 8px;
`;

const Menu = styled.div`
  visibility: ${(props) => props.see || 'hidden'};
  position: relative;
  width: 400px;
  background: #ffffff;
  height: 95%;
  left: 10%;
  border: 5px solid #afafaf;
  z-index: 1;
`;

const MenuTop = styled.div`
  width: 390px;
  height: 30%;
  background: url(${(props) =>
      props.url ||
      'https://www.ui4u.go.kr/tour/img/content/img_mountain_pic02.png'})
    no-repeat center center;
  background-size: 100% 100%;
`;

const SunInfo = styled.div`
  position: relative;
  width: 150px;
  height: 20px;
  border-radius: 8px;
  background: #ffffff;
  opacity: 0.89;
  top: 85%;
  left: 57%;

  .weather {
    width: 22px;
    height: 22px;
    margin-left: 5px;
    margin-top: 1px;
  }

  .time {
    position: absolute;
    width: 115px;
    height: 22px;
    font: normal normal normal 10px/14px Segoe UI;
    text-align: left;
    top: 15%;
    margin-left: 2px;
  }
`;

const MenuInfo = styled.div`
  width: 100%;
  height: 70%;
  background: #ffffff;
  overflow: scroll;

  .title {
    margin-top: 10px;
    margin-left: 15px;
    height: 50px;
  }

  .mTitle {
    font: normal normal bold 23px Segoe UI;
    margin-right: 5px;
  }

  .sTitle {
    font: normal normal bold 18px Segoe UI;
    margin-bottom: 5px;
  }

  .mTag {
    font: normal normal normal 13px Segoe UI;
    color: #6783a6;
  }

  .mContent {
    font: normal normal normal 13px Segoe UI;
    margin-top: 5px;
  }

  .mLikebtn {
    float: right;
    margin-right: 15px;
    margin-top: 5px;
    font-size: 20px;
    background: none;
    border: none;
  }

  .element {
    font: normal normal normal 13px Segoe UI;
    height: 160px;
    margin-top: 10px;
    margin-left: 15px;
    line-height: 25px;
  }

  .eName {
    float: left;
    text-align: left;
  }

  .eResult {
    padding-left: 30px;
    display: inline-block;
  }

  .review {
    font: normal normal normal 13px Segoe UI;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 15px;
    line-height: 25px;
  }

  .cReview {
    float: right;
    width: 60px;
    height: 23px;
    background: #afafaf;
    color: white;
    border: none;
    border-radius: 8px;
    font: normal normal normal 11px Segoe UI;

    &:hover {
      opacity: 0.7;
    }
  }

  .line-out {
    width: 100%;
    text-align: center;
  }

  .line {
    display: inline-block;
    width: 340px;
    height: 1px;
    background: #afafaf;
  }

  .eT {
    color: #2a1bf3;
    font: normal normal bold 11px Segoe UI;
  }

  .eF {
    color: #ea2b2b;
    font: normal normal bold 11px Segoe UI;
  }

  .mLike {
    color: Red;
  }
`;

const MapSearch = () => {
  const [pos, setPos] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [hashtag, setHashtag] = useState('');

  const [heart, setHeart] = useState(false);
  const [toiletO, setToiletO] = useState(0);
  const [toiletX, setToiletX] = useState(0);
  const [parkingO, setParkingO] = useState(0);
  const [parkingX, setParkingX] = useState(0);
  const [drinkO, setDrinkO] = useState(0);
  const [drinkX, setDrinkX] = useState(0);
  const [eatO, setEatO] = useState(0);
  const [eatX, setEatX] = useState(0);
  const [storeO, setStoreO] = useState(0);
  const [storeX, setStoreX] = useState(0);

  const [review, setReview] = useState([]);
  const [mntImage, setMntImage] = useState('');
  // const navigate = useNavigate();

  if (pos) {
    fetch('http://54.208.255.25:8080/api/map/' + pos, {
      method: 'GET',
      async: false,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setToiletO(data.mountain.facility[0].t);
        setToiletX(data.mountain.facility[0].f);
        setParkingO(data.mountain.facility[1].t);
        setParkingX(data.mountain.facility[1].t);
        setDrinkO(data.mountain.facility[2].t);
        setDrinkX(data.mountain.facility[2].t);
        setEatO(data.mountain.facility[3].t);
        setEatX(data.mountain.facility[3].t);
        setStoreO(data.mountain.facility[4].t);
        setStoreX(data.mountain.facility[4].t);

        setHashtag(data.mountain.hashtags);
        setMntImage(data.mountain.image);
        // console.log(data.reviews[1]._id);
        const initData = data.reviews.map((it) => {
          return {
            _id: it._id,
            writer: it.writer,
            mountain: it.mountain,
            rating: it.rating,
            hashtags: it.hashtags,
            visited: it.visited,
            createdAt: it.createdAt,
            updatedAt: it.updatedAt,
            comment: it.comment,
            level: it.level,
            name: it.name,
            image: it.image,
          };
        });
        setReview(initData);
        if (data.reviews.length >= 1) {
          setHeart(true);
        }
      })
      .then((error) => {
        console.log(error);
      });
  }

  const onSubmit = (e) => {
    saveLocal();
  };

  const saveLocal = () => {
    localStorage.setItem('pos', pos);
  };

  const onChange = (e) => {
    setPos(e.target.value);
  };

  const navigate = useNavigate();
  const clickReview = (e) => {
    navigate('/writereview', {
      state: {
        mountain: pos,
        address: address,
        lat: latitude,
        lng: longitude,
      },
    });
  };
  // const clickHeart = () => {
  //   setHeart(!heart);
  // };

  useEffect(() => {
    const p = localStorage.getItem('pos');
    if (p) {
      setPos(p);
    }
    const a = localStorage.getItem('address');
    if (a) {
      setAddress(a);
    }
    const la = localStorage.getItem('lat');
    if (la) {
      setLatitude(la);
    }
    const ln = localStorage.getItem('long');
    if (ln) {
      setLongitude(ln);
    }
  }, []);

  return (
    <div>
      <Header />
      <MapPage id="mapPage">
        <Map id="map" />
        <MapInput>
          <Search className="search">
            <form onSubmit={onSubmit}>
              <Input
                type="text"
                id="keyword"
                placeholder="장소명을 검색하세요."
                autoComplete="off"
                value={pos}
                onChange={onChange}
              />

              <Button type="submit">
                <MdSearch />
              </Button>
            </form>
          </Search>
          <ul id="placesList"></ul>
        </MapInput>

        <Menu id="menu" see="hidden">
          <MenuTop id="menuTop" url={mntImage}>
            <SunInfo>
              <WiDayCloudy className="weather" />
              <span className="time">
                일출 | <span id="sunset"> 07:00 </span> | 일몰 |
                <span id="sunrise"> 19:00 </span>
              </span>
            </SunInfo>
          </MenuTop>

          <MenuInfo>
            <div className="title">
              <span className="mTitle" id="mName"></span>
              <span className="mTag">{hashtag}</span>
              {/* <button onClick={clickHeart} className="mLikebtn"> */}
              <button className="mLikebtn">
                {heart ? (
                  <ImHeart className="mLike" />
                ) : (
                  <FiHeart className="mLike" />
                )}
              </button>
              <div className="mContent" id="mPos"></div>
            </div>
            <div className="line-out">
              <div className="line" />
            </div>
            <div className="element">
              <div className="sTitle">시설 여부</div>
              <div className="eName">
                화장실
                <br />
                주차공간
                <br />
                음수대
                <br />
                먹거리시설
                <br />
                물, 음료 파는 곳
              </div>

              <div>
                <div className="eResult">
                  <span className="eT">O</span> (<span>{toiletO}</span>)
                  <br />
                  <span className="eT">O</span> (<span>{parkingO}</span>)
                  <br />
                  <span className="eT">O</span> (<span>{drinkO}</span>)
                  <br />
                  <span className="eT">O</span> (<span>{eatO}</span>)
                  <br />
                  <span className="eT">O</span> (<span>{storeO}</span>)
                </div>
                <div className="eResult">
                  <span className="eT">X</span> (<span>{toiletX}</span>)
                  <br />
                  <span className="eT">X</span> (<span>{parkingX}</span>)
                  <br />
                  <span className="eT">X</span> (<span>{drinkX}</span>)
                  <br />
                  <span className="eT">X</span> (<span>{eatX}</span>)
                  <br />
                  <span className="eT">X</span> (<span>{storeX}</span>)
                </div>
              </div>
            </div>
            <div className="line-out">
              <div className="line" />
            </div>
            <div className="review">
              <span className="sTitle">후기</span>
              {/* <Link to="/writereview"> */}
              <button
                onClick={clickReview}
                className="cReview"
                // mountain={pos}
                // address={address}
                // lat={latitude}
                // lng={longitude}
              >
                후기작성
              </button>
              {/* </Link> */}
              {review.map((reviews) => (
                <ReviewItem
                  name={reviews.name}
                  level={reviews.level}
                  date={reviews.updatedAt.slice(0, 10)}
                  visit={reviews.visited}
                  comment={reviews.comment}
                  rating={reviews.rating}
                />
              ))}
            </div>
          </MenuInfo>
        </Menu>
      </MapPage>
      <Footer />
    </div>
  );
};

export default MapSearch;
