import Header from '../Header';
import Footer from '../Footer';
import ReviewItem from './ReviewItem';
import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';

import { MdSearch } from 'react-icons/md';
import { WiDayCloudy } from 'react-icons/wi';
// import { BiStar } from 'react-icons/bi'; // 빈 별
// import { ImStarFull } from 'react-icons/im'; // 꽉찬별
import { FiHeart } from 'react-icons/fi'; // 빈 하트
// import { ImHeart } from 'react-icons/im'; // 꽉찬하트

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
  // width: 80%;
  // height: 30px;
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
  // visibility: hidden;
  visibility: ${(props) => props.see || 'hidden'};
  position: relative;
  width: 400px;
  background: #ffffff;
  height: 95%;
  left: 10%;
  border: 5px solid #afafaf;
  z-index: 1;

  // .open {
  //   visibility: visible;
  //   position: relative;
  //   width: 400px;
  //   background: #ffffff;
  //   height: 95%;
  //   left: 10%;
  //   border: 5px solid #afafaf;
  //   z-index: 1;
  }
`;

const MenuTop = styled.div`
  width: 390px;
  height: 30%;
  background: url('https://www.ui4u.go.kr/tour/img/content/img_mountain_pic02.png')
    no-repeat center center;
`;

const SunInfo = styled.div`
  position: relative;
  width: 150px;
  height: 20px;
  border-radius: 8px;
  background: #ffffff;
  opacity: 0.89;
  // top: 170px;
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
    float: right;
    margin-right: 140px;
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
`;

const MapSearch = () => {
  const [pos, setPos] = useState('');
  const [mntname, setMntname] = useState('');
  const [mntaddress, setMntaddress] = useState('');

  const onSubmit = (e) => {
    saveLocal();
  };

  const saveLocal = () => {
    localStorage.setItem('pos', pos);
  };

  const onChange = (e) => {
    setPos(e.target.value);
  };

  useEffect(() => {
    const data = localStorage.getItem('pos');
    if (data) {
      setPos(data);
      setMntname(data);
    }
  }, []);

  return (
    <div>
      <Header />
      <MapPage id="mapPage" className="map_wrap">
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
          <MenuTop id="menuTop">
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
              <span className="mTitle" id="mName">
                {/* {mntname} */}
              </span>
              <span className="mTag">#계곡 #서울특별시</span>
              <button className="mLikebtn">
                <FiHeart className="mLike" />
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

              <div className="eResult">
                <div>
                  <span className="eT">O</span> (<span id="e1T">30</span>)
                  <span className="eF"> &nbsp;X</span> (<span id="e1F">2</span>)
                </div>
                <div>
                  <span className="eT">O</span> (<span id="e2T">30</span>)
                  <span className="eF"> &nbsp;X</span> (<span id="e2F">2</span>)
                </div>
                <div>
                  <span className="eT">O</span> (<span id="e3T">30</span>)
                  <span className="eF"> &nbsp;X</span> (<span id="e3F">2</span>)
                </div>
                <div>
                  <span className="eT">O</span> (<span id="e4T">30</span>)
                  <span className="eF"> &nbsp;X</span> (<span id="e4F">2</span>)
                </div>
                <div>
                  <span className="eT">O</span> (<span id="e5T">30</span>)
                  <span className="eF"> &nbsp;X</span> (<span id="e5F">2</span>)
                </div>
              </div>
            </div>
            <div className="line-out">
              <div className="line" />
            </div>
            <div className="review">
              <span className="sTitle">후기</span>
              <button className="cReview">후기작성</button>
              <ReviewItem />
              <ReviewItem />
              <ReviewItem />
            </div>
          </MenuInfo>
        </Menu>
      </MapPage>
      <Footer />
    </div>
  );
};

export default MapSearch;
