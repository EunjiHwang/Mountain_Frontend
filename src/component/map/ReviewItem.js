import styled from 'styled-components';
import { BsStarFill } from 'react-icons/bs'; // 꽉찬별
import { BsStarHalf } from 'react-icons/bs'; // 반별
import { BsStar } from 'react-icons/bs'; // 빈별

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

const UserStar = styled.div`
  display: inline;
  margin-right: 5px;
`;

const ReviewItem = () => {
  return (
    <Review>
      <UserImg />
      <UserName id="userName">박이슬</UserName>
      <UserfontM id="userLevel">Level. 등린이</UserfontM>
      <UserStar className="userstar">
        <BsStarFill id="star1" color="fff500" />
        <BsStarFill id="star2" color="fff500" />
        <BsStarFill id="star3" color="fff500" />
        <BsStarFill id="star4" color="fff500" />
        <BsStarFill id="star5" color="fff500" />
      </UserStar>
      <UserfontS className="reviewdate">4.4월</UserfontS>
      <UserfontS>&nbsp;º&nbsp;</UserfontS>
      <UserfontS className="numofvisit">1번째 방문</UserfontS>
      <UserfontM id="comment">
        공기도 맑고, 너무 좋았어요!! 근데 여기 등산 입구 찾기가 어려워요ㅠ
      </UserfontM>
    </Review>
  );
};

export default ReviewItem;
