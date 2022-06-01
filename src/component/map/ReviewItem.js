import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  background: url('https://cdn-icons-png.flaticon.com/512/1142/1142743.png')
    no-repeat;
  background-size: 30px;
`;

const UserName = styled.div`
  font: normal normal normal 13px Segoe UI;
  margin-bottom: 1px;
`;

const UserfontM = styled.div`
  // display: inline;
  font: normal normal normal 10px Segoe UI;
`;

const UserfontS = styled.div`
  display: inline;
  font: normal normal normal 8px Segoe UI;
`;

const Btn = styled.button`
  display: inline;
  font: normal normal normal 8px Segoe UI;
  background: none;
  border: none;
`;

const Btndiv = styled.div`
  visibility: ${(props) => props.see || 'hidden'};
  display: inline;
  float: right;
  margin-right: 180px;
`;

function ReviewItem({
  mntName,
  id,
  writer,
  name,
  level,
  date,
  visit,
  comment,
  rating,
  see,
}) {
  if (level === 1) {
    level = '시작한닭';
  } else if (level >= 2 && level <= 5) {
    level = '등린이';
  } else if (level >= 6 && level <= 8) {
    level = '등시생';
  } else if (level >= 9 && level <= 10) {
    level = '잘탄닭';
  }

  rating = parseInt(rating);
  // console.log(mntName);
  const navigate = useNavigate();
  const editReview = (e) => {
    navigate('/writereview', {
      state: {
        _id: id,
        mountain: mntName,
        state: 'edit',
      },
    });
  };

  const deleteReview = () => {
    fetch('http://54.208.255.25:8080/api/review/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        writer: writer,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === true) {
          alert('후기가 삭제되었습니다.');
          window.location.reload();
        } else {
          alert('삭제에 실패하였습니다.');
        }
      })
      .then((error) => {
        console.log('error');
      });
  };

  if (rating === 0) {
    return (
      <Review>
        <UserImg />
        <UserName id="userName">
          {name}
          <Btndiv see={see}>
            <Btn onClick={editReview}>수정</Btn>|
            <Btn onClick={deleteReview}>삭제</Btn>
          </Btndiv>
        </UserName>
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
        <UserName id="userName">
          {name}
          <Btndiv see={see}>
            <Btn onClick={editReview}>수정</Btn>|
            <Btn onClick={deleteReview}>삭제</Btn>
          </Btndiv>
        </UserName>
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
        <UserName id="userName">
          {name}
          <Btndiv see={see}>
            <Btn onClick={editReview}>수정</Btn>|
            <Btn onClick={deleteReview}>삭제</Btn>
          </Btndiv>
        </UserName>
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
        <UserName id="userName">
          {name}
          <Btndiv see={see}>
            <Btn onClick={editReview}>수정</Btn>|
            <Btn onClick={deleteReview}>삭제</Btn>
          </Btndiv>
        </UserName>
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
        <UserName id="userName">
          {name}
          <Btndiv see={see}>
            <Btn onClick={editReview}>수정</Btn>|
            <Btn onClick={deleteReview}>삭제</Btn>
          </Btndiv>
        </UserName>
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
        <UserName id="userName">
          {name}
          <Btndiv see={see}>
            <Btn onClick={editReview}>수정</Btn>|
            <Btn onClick={deleteReview}>삭제</Btn>
          </Btndiv>
        </UserName>
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
