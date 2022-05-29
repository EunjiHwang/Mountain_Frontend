import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging/ReviewPaging';

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 77vh;
  text-align: left;
  font-family: 'Segoe UI';
`;
const WritingDiv = styled.div`
  /* 내가 작성한 글 Block Div 스타일 */
  width: 900px;
  height: 600px;
  position: absolute;
  padding: 40px 30px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  box-shadow: 0px 5px 10px;
`;
const H3 = styled.h3`
  /* 제목 스타일 */
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 25px;
`;
const Button = styled.button`
  /* 등록, 목록 버튼 스타일 */
  margin: 10px;
  width: 60px;
  border-radius: 10px;
`;

function MyReview(props) {
  const navigate = useNavigate();

  const [list, setList] = React.useState([]);

  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(3); //페이지당 콘텐츠 개수
  const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
  const [currentPosts, setCurrentPosts] = React.useState(0);

  React.useEffect(() => {
     setCount(list.length);
   }, [list]);

  React.useEffect(() => {
    setCount(list.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(list.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, list, postPerPage]);
  

  const setPage = (e) => {
    setCurrentpage(e);
  };

  const handleClick = () => {
    navigate('/map');
  };

  fetch('http://54.208.255.25:8080/api/review/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      writer: localStorage.getItem('userId'),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const initData = res.list.map((it) => {
        return {
          _id: it._id,
          writer: it.writer,
          mountain: it.mountain,
          mountainName: it.mountain_name,
          address: it.address,
          rating: it.rating,
          facility: it.facility,
          comment: it.comment,
          visited: it.visited,
          createAt: it.createdAt,
          updateAt:
            it.updatedAt.slice(0, 10) + ' ' + it.updatedAt.slice(11, 16),
        };
      });
      setList(initData);
      setCount(initData.length);
    });

    React.useEffect(() => {
      setCount(list.length);
   }, [list]);
  
    React.useEffect(() => {
      setCount(list.length);
      setIndexOfLastPost(currentpage * postPerPage);
      setIndexOfFirstPost(indexOfLastPost - postPerPage);
      setCurrentPosts(list.slice(indexOfFirstPost, indexOfLastPost));
    }, [currentpage, indexOfFirstPost, indexOfLastPost, list, postPerPage]);
  
    
  const style = {
    backgroundcolor: 'green',
  };
  return (
    <>
      <div>
        <Header />
        <Div>
          <WritingDiv>
            <div className="row border-bottom border-success border-3">
              <div className="col">
                <H3>내가 작성한 후기</H3>
              </div>
            </div>

            {currentPosts && list.length > 0 ? (
              currentPosts.map((lists) => (

              <div
                className="row border border-2 mt-4"
                style={{ borderRadius: '15px' }}
                onClick={handleClick}
                key={lists._id}
              >
                <div className="row pt-2">
                  <div className="col-10">
                    <div className="fw-bold">{lists.mountainName}</div>
                  </div>
                  <div className="col text-end" style={{ color: '#808080' }}>
                    {lists.updateAt}
                  </div>
                </div>

                <div className="row pt-2 pb-2">
                  <div className="col-10">
                    <div
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        color: '#808080',
                      }}
                    >
                      {lists.comment}
                    </div>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div
              className="row border border-2 mt-4"
              style={{ borderRadius: '15px' }}
            >
              <div className="row pt-2">
                <div className="col-10">
                  <div className="fw-bold">작성한 후기가 존재하지 않습니다</div>
                </div>
              </div>
              <div className="row pt-2 pb-2">
                <div className="col-10">
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      color: '#808080',
                    }}
                  ></div>
                </div>
                <div
                  className="col text-end"
                  style={{ color: '#808080' }}
                ></div>
              </div>
            </div>
            )}

            <hr width="100% " />
            <br />
            <Paging page={currentpage} count={count} setPage={setPage} />
          </WritingDiv>
        </Div>
        <Footer />
      </div>
    </>
  );
}
export default MyReview;