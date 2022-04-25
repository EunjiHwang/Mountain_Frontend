/*global kakao */
import MapSearch from './map/MapSearch';
import React, { useEffect } from 'react';

export default function Map() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(37.2231, 127.1873),
      level: 3,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // --------------------------------------------- 위치 ------------------------------------------------------
    // 위치 정보를 동의한 경우
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어온다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        // 마커가 표시될 위치 - 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
        var locPosition = new kakao.maps.LatLng(lat, lon);

        // 마커를 생성
        const marker = new kakao.maps.Marker({
          position: locPosition,
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
      });
    } else {
      alert('위치정보를 알 수 없습니다.');
      // 마커가 표시될 위치 - 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
      var locPosition = new kakao.maps.LatLng(37.2231, 127.1873);

      // 마커를 생성
      const marker = new kakao.maps.Marker({
        position: locPosition,
      });

      // 마커를 지도 위에 표시
      marker.setMap(map);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
    // -------------------------------------------------------------------------------------------------------

    // --------------------------------------------- 스카이뷰 & 줌 ------------------------------------------------------
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // -----------------------------------------------------------------------------------------------------------------

    // // 장소 검색 객체를 생성합니다
    // var ps = new kakao.maps.services.Places();

    // // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // // 키워드로 장소를 검색합니다
    // searchPlaces();

    // // 키워드 검색을 요청하는 함수입니다
    // function searchPlaces() {
    //   var keyword = document.getElementById('keyword').value;

    //   if (!keyword.replace(/^\s+|\s+$/g, '')) {
    //     alert('키워드를 입력해주세요!');
    //     return false;
    //   }

    //   // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    //   ps.keywordSearch(keyword, placesSearchCB);
    // }

    // // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    // function placesSearchCB(data, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 정상적으로 검색이 완료됐으면
    //     // 검색 목록과 마커를 표출합니다
    //     displayPlaces(data);
    //   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    //     alert('검색 결과가 존재하지 않습니다.');
    //     return;
    //   } else if (status === kakao.maps.services.Status.ERROR) {
    //     alert('검색 결과 중 오류가 발생했습니다.');
    //     return;
    //   }
    // }

    // // 검색 결과 목록과 마커를 표출하는 함수입니다
    // function displayPlaces(places) {
    //   var menuEl = document.getElementById('menu_wrap'),
    //     fragment = document.createDocumentFragment(),
    //     bounds = new kakao.maps.LatLngBounds(),
    //     listStr = '';

    //   // 지도에 표시되고 있는 마커를 제거합니다
    //   removeMarker();

    //   var placePosition = new kakao.maps.LatLng(places.y, places.x);

    //   // 마커를 생성
    //   const marker = new kakao.maps.Marker({
    //     position: placePosition,
    //   });

    //   // 마커를 지도 위에 표시
    //   marker.setMap(map);

    //   // 지도 중심좌표를 접속위치로 변경합니다
    //   map.setCenter(placePosition);

    //   // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //   // LatLngBounds 객체에 좌표를 추가합니다
    //   bounds.extend(placePosition);

    //   // 마커와 검색결과 항목에 mouseover 했을때
    //   // 해당 장소에 인포윈도우에 장소명을 표시합니다
    //   // mouseout 했을 때는 인포윈도우를 닫습니다
    //   (function (marker, title) {
    //     kakao.maps.event.addListener(marker, 'mouseover', function () {
    //       displayInfowindow(marker, title);
    //     });

    //     kakao.maps.event.addListener(marker, 'mouseout', function () {
    //       infowindow.close();
    //     });

    //     itemEl.onmouseover = function () {
    //       displayInfowindow(marker, title);
    //     };

    //     itemEl.onmouseout = function () {
    //       infowindow.close();
    //     };
    //   })(marker, places[i].place_name);

    //   fragment.appendChild(itemEl);
    // }

    // menuEl.scrollTop = 0;

    // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    // map.setBounds(bounds);
  };

  return <MapSearch />;
}
