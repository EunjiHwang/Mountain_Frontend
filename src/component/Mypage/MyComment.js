import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { renderMatches, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';


function MyComment(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const items = useSelector((state) => state);

  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(6); //페이지당 콘텐츠 개수

  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setCount(items.length);
  }, [items]);

  const indexOfLastPost = currentpage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  //const searchContent = (text) => dispatch(searchContent(text));

  const setPage = (e) => {
    setCurrentpage(e);
  };

  const handleClick = () => {
    navigate('/community/add');
  };
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
const H3 = styled.h3`
  font-weight: bold;
`
const style={
    backgroundcolor: 'green',
}
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
          
        {currentPosts.map((item) => (
          <div
            className="row border border-2 mt-4"
            style={{ borderRadius: '15px' }}
            key={item.id}
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
        ))}
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
