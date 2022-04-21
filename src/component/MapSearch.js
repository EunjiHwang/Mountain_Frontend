import Header from './Header';
import Footer from './Footer';

import { MdSearch } from 'react-icons/md';
import { WiDayCloudy } from 'react-icons/wi';
import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

const MapPage = styled.div`
  position: relative;
  height: 585px;
`;

const Input = styled.input`
  position: absolute;
  width: 310px;
  height: 30px;
  border: 1px solid #707070;
  font: normal normal normal 16px Segoe UI;
  padding-left: 10px;
  border-radius: 7px;
`;

const Map = styled.div`
  position: absolute;
  z-index: 0;
  top: 20px;
  left: 77px;
  right: 10px;
  width: 1355px;
  height: 540px;
`;

const Search = styled.div`
  position: relative;
  top: 35px;
  left: 105px;
  z-index: 1;
`;

const Button = styled.button`
  position: absolute;
  background-color: #ffffff;
  width: 30px;
  height: 23px;
  font-size: 1.2em;
  border: none;
  left: 290px;
  top: 6.5px;
`;

const Menu = styled.div`
  position: relative;
  width: 370px;
  height: 530px;
  background: #ffffff;
  top: 20px;
  left: 77px;
  border: 5px solid #afafaf;
`;

const MenuTop = styled.div`
  width: 370px;
  height: 200px;
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
  top: 170px;
  left: 212px;

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
    top: 3.9px;
    margin-left: 2px;
  }
`;

const MenuInfo = styled.div`
  width: 370px;
  height: 330px;
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

  .mLike {
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
    height: 200px;
    margin-top: 10px;
    margin-left: 15px;
    line-height: 25px;
  }

  .cReview {
    float: right;
    margin-right: 15px;
    width: 60px;
    height: 23px;
    background: #afafaf;
    color: white;
    border: none;
    border-radius: 8px;
    font: normal normal normal 11px Segoe UI;
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
  return (
    <div>
      <Header />
      <MapPage id="mapPage">
        <Search id="search">
          <Input
            type="text"
            id="keyword"
            placeholder="장소명을 검색하세요."
            autoComplete="off"
          />

          <Button type="submit">
            <MdSearch />
          </Button>
        </Search>

        <Map id="map" />

        <Menu id="menu">
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
              <span className="mTitle">도봉산</span>
              <span className="mTag">#계곡 #서울특별시</span>
              <button className="mLike">
                <FiHeart />
              </button>
              <div className="mContent" id="mPos">
                서울 도봉구 도봉동
              </div>
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
            </div>
          </MenuInfo>
        </Menu>
      </MapPage>
      <Footer />
    </div>
  );
};

export default MapSearch;
