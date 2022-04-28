import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderMatches, useNavigate } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';

function ListView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const items = useSelector((state) => state);

  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(7); //페이지당 콘텐츠 개수

  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    setCount(items.length);
  }, [items]);

  const indexOfLastPost = currentpage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  //const searchContent = (text) => dispatch(searchContent(text));

  const handleClick = () => {
    navigate('/community/add');
  };

  const setPage = (e) => {
    setCurrentpage(e);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchText(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      //items.filter((item) => item.content.includes(searchText));
    }
  };

  return (
    <>
      <div>
      <Header />
      <div className='container'>
        <div className="row border-bottom border-success border-3">
          <div className="col">
            <h1 className="form-control-lg gr">커뮤니티 게시판</h1>
          </div>
          <div className="col">
            <form onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={searchText}
                onChange={onChange}
                type="text"
                placeholder="검색어를 입력하세요."
                className="form-control control-type"
              />
            </form>
          </div>
          <div className="col-2">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleClick}
              style={{ float: 'right' }}
            >
              글 작성하기
            </button>
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
                <div className="fw-bold">{item.title}</div>
              </div>
              <div className="col text-end" style={{ color: '#808080' }}>
                {item.data}
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
                  {item.content}
                </div>
              </div>
              <div className="col text-end" style={{ color: '#808080' }}>
                {item.nickname}
              </div>
              
            </div>
          </div>
        ))}
        <Paging page={currentpage} count={count} setPage={setPage} />
        </div>
        <Footer />
      </div>
 
    </>
  );
}

export default ListView;

