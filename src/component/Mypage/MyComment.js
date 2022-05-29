import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging/CommentPaging';
import { useNavigate } from 'react-router-dom';

const H3 = styled.h3`
  /* 제목 스타일 */
  font-weight: bold;
  margin-top:15px;
  margin-bottom:15px;
  font-size:25px;
`;

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
  /* 내가 작성한 댓글 Block Div 스타일 */
  width: 900px; height: 600px;
  position: absolute;
  padding: 40px 30px; 
  background: white;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  box-shadow: 0px 5px 10px;
`

function MyComment(props) {

  const navigate = useNavigate();
  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(6); //페이지당 콘텐츠 개수
  const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
  const [currentPosts, setCurrentPosts] = React.useState(0);


  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('http://54.208.255.25:8080/api/reply/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         writer: localStorage.getItem('userId'),
      }),
    })
      .then((response) => {
        console.log('res', response);
        return response.json();
      })
      .then((data) => {
        console.log('data', data.list);
         for (let i = 0; i < data.list.length; i++) {
           setItems([data.list[i]]);
         }
        setItems(data.list);
      });
  }, []);


  React.useEffect(() => {
    setCount(items.length);
 }, [items]);

  React.useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);


  const setPage = (e) => {
    setCurrentpage(e);
  };

  const onDetailClick = (id) => {
    navigate('/community/detail/' + id, { state: { id } });
  };

  return (
    <>
      <div >
      <Header />
      <Div>
          <WritingDiv> 
          <div className="row border-bottom border-success border-3" >
          <div className="col">
            <H3>내가 작성한 댓글</H3>
          </div>
        </div>
        
        {currentPosts && items.length > 0 ? (
              currentPosts.map((item) => (
          <div
            className="row border border-2 mt-4"
            style={{ borderRadius: '15px' }}
            key={item.id}
            onClick={() => onDetailClick(item.post_count)}
          >
              <div className="row pt-2">
              <div className="col-10">
              <div
                  style={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    color: '#808080',
                  }}
                >
                  {item.content}
                </div>
              </div>
              <div className="col text-end" style={{ color: '#808080' }}>
                {item.data}
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
              <div className="fw-bold">작성한 댓글이 존재하지 않습니다</div>
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
        <div>
            <hr width="100% " /><br />  
        </div>
        <Paging page={currentpage} count={count} setPage={setPage} />
        </WritingDiv>
      </Div>
      <Footer />
      </div>
    </>
  );
}

export default MyComment;
