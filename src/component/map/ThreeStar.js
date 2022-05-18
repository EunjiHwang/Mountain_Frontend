import styled from 'styled-components';
import React from 'react';
import { BsStarFill } from 'react-icons/bs'; // 꽉찬별
import { BsStarHalf } from 'react-icons/bs'; // 반별
import { BsStar } from 'react-icons/bs'; // 빈별

const UserStar = styled.div`
  display: inline;
  margin-right: 5px;
`;

const ThreeStar = () => {
  return (
    <UserStar className="userstar" id="stars">
      <BsStarFill color="fff500" />
      <BsStarFill color="fff500" />
      <BsStarFill color="fff500" />
      <BsStar color="black" />
      <BsStar color="black" />
    </UserStar>
  );
};

export default ThreeStar;
