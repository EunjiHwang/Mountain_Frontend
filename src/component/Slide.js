import React from 'react';
import styled from 'styled-components';

// 슬라이더의 요소가 되는 컴포넌트
const IMG = styled.img`
  width: 500px;
  height: 500px;
`;

function Slide({ img }) {
  return <IMG src={img} />;
}

export default Slide;

