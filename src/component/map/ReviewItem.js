import styled from 'styled-components';
import React, { useState } from 'react';
import { BsStarFill } from 'react-icons/bs'; // 꽉찬별
import { BsStarHalf } from 'react-icons/bs'; // 반별
import { BsStar } from 'react-icons/bs'; // 빈별

import ZeroStar from './ZeroStar';
import OneStar from './OneStar';
import TwoStar from './TwoStar';
import ThreeStar from './ThreeStar';
import FourStar from './FourStar';
import FiveStar from './FiveStar';

const Review = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UserImg = styled.div`
  float: left;
  width: 30px;
  height: 30px;
  border: 1px solid #7a7a7a;
  border-radius: 25px;
  margin-right: 10px;
`;

const UserName = styled.div`
  font: normal normal normal 13px Segoe UI;
  margin-bottom: 1px;
`;

const UserfontM = styled.div`
  font: normal normal normal 10px Segoe UI;
`;

const UserfontS = styled.div`
  display: inline;
  font: normal normal normal 8px Segoe UI;
`;

function ReviewItem({ name, level, date, visit, comment, rating }) {
  if (level === 1) {
    level = '준비생';
  } else if (level >= 2 && level <= 5) {
    level = '등린이';
  } else if (level >= 6 && level <= 8) {
    level = '등시생';
  } else if (level >= 9 && level <= 10) {
    level = '등산고수';
  }

  rating = parseInt(rating);

  if (rating === 0) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">{name}</UserName>
        <UserfontM id="userLevel">Level. {level}</UserfontM>
        <ZeroStar />
        <UserfontS>{date}</UserfontS>
        <UserfontS>&nbsp;º&nbsp;</UserfontS>
        <UserfontS>{visit}번째 방문</UserfontS>
        <UserfontM>{comment}</UserfontM>
      </Review>
    );
  } else if (rating === 1) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">{name}</UserName>
        <UserfontM id="userLevel">Level. {level}</UserfontM>
        <OneStar />
        <UserfontS>{date}</UserfontS>
        <UserfontS>&nbsp;º&nbsp;</UserfontS>
        <UserfontS>{visit}번째 방문</UserfontS>
        <UserfontM>{comment}</UserfontM>
      </Review>
    );
  } else if (rating === 2) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">{name}</UserName>
        <UserfontM id="userLevel">Level. {level}</UserfontM>
        <TwoStar />
        <UserfontS>{date}</UserfontS>
        <UserfontS>&nbsp;º&nbsp;</UserfontS>
        <UserfontS>{visit}번째 방문</UserfontS>
        <UserfontM>{comment}</UserfontM>
      </Review>
    );
  } else if (rating === 3) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">{name}</UserName>
        <UserfontM id="userLevel">Level. {level}</UserfontM>
        <ThreeStar />
        <UserfontS>{date}</UserfontS>
        <UserfontS>&nbsp;º&nbsp;</UserfontS>
        <UserfontS>{visit}번째 방문</UserfontS>
        <UserfontM>{comment}</UserfontM>
      </Review>
    );
  } else if (rating === 4) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">{name}</UserName>
        <UserfontM id="userLevel">Level. {level}</UserfontM>
        <FourStar />
        <UserfontS>{date}</UserfontS>
        <UserfontS>&nbsp;º&nbsp;</UserfontS>
        <UserfontS>{visit}번째 방문</UserfontS>
        <UserfontM>{comment}</UserfontM>
      </Review>
    );
  } else if (rating === 5) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">{name}</UserName>
        <UserfontM id="userLevel">Level. {level}</UserfontM>
        <FiveStar />
        <UserfontS>{date}</UserfontS>
        <UserfontS>&nbsp;º&nbsp;</UserfontS>
        <UserfontS>{visit}번째 방문</UserfontS>
        <UserfontM>{comment}</UserfontM>
      </Review>
    );
  }
}

export default ReviewItem;
