import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: -10px 0 0 30px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const ARRAY = [0, 1, 2, 3, 4];

function StarScroe({setStar}) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = index => {
    let clickStates = [...clicked];
    let countStar = 0;
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    for (let i = 0; i < 5; i++){
      if (clickStates[i] === true) {
        countStar += 1;
      }
    }
    setStar(countStar);
    setClicked(clickStates);
  };

  // 백엔드로 데이터 보내기
  // useEffect(() => {
  //   sendReview();
  // }, [clicked]); 

  // const sendReview = () => {
  //   let score = clicked.filter(Boolean).length;
  //   fetch('http://52.78.63.175:8000/movie', {
  //     method: 'POST',
  //     Headers: {
  //       Authroization: 'e7f59ef4b4900fe5aa839fcbe7c5ceb7',
  //     },
  //     body: JSON.stringify({
  //       movie_id:1
  //       star: score,
  //     }),
  //   });
  // };

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="30"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && 'yellowStar'}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

export default StarScroe;
