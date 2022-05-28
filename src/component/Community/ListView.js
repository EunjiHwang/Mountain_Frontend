import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
`;

const H3 = styled.h3`
  /*제목 스타일*/
  font-weight: bold;
  color: #4c8969;
  font-size: 25px;
`;
const Button = styled.button`
  /* 글 작성하기 버튼 스타일 */
  width: 130px;
  border-radius: 10px;
`;

function ListView(props) {
  const navigate = useNavigate();
  const inputRef = React.useRef(null);
  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(7); //페이지당 콘텐츠 개수

  const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
  const [currentPosts, setCurrentPosts] = React.useState(0);

  const [searchText, setSearchText] = React.useState('');
  const [items, setItems] = React.useState([]);

  const { userId, isLogin } = props;

  React.useEffect(() => {
    fetch('http://54.208.255.25:8080/api/post/main', {
      method: 'GET',
      async: false,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data.list);
      });
    console.log('게시물 목록조회');
  }, []);

  React.useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
    console.log('목록조회 items', items);
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

  const handleClick = () => {
    if (!isLogin) {
      alert('로그인을 해주세요.');
      return;
    } else {
      navigate('/community/add');
    }
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
      fetch('http://54.208.255.25:8080/api/post/main/' + searchText, {
        method: 'GET',
        async: false,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setItems(data.list);
        });
    }
  };

  const onDetailClick = (id) => {
    navigate('/community/detail/' + id, { state: { id } });
  };

  return (
    <>
      <div>
        <Header />
        <Div>
          <div className="container">
            <div className="row border-bottom border-success border-3">
              <div className="col">
                <H3 className="form-control-lg gr">커뮤니티 게시판</H3>
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
                <Button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={handleClick}
                  style={{ float: 'right' }}
                >
                  글 작성하기
                </Button>
              </div>
            </div>
            {currentPosts && items.length > 0 ? (
              currentPosts.map((item) => (
                <div
                  className="row border border-2 mt-4"
                  style={{
                    borderRadius: '15px',
                    padding: '10px 0 10px 0',
                    cursor: 'pointer',
                  }}
                  key={item._id}
                  onClick={() => onDetailClick(item.count)}
                >
                  <div className="row pt-2">
                    <div className="col-9">
                      <div className="fw-bold" style={{ fontSize: '1.4em' }}>
                        {item.title}
                      </div>
                    </div>
                    <div
                      className="col text-end"
                      style={{ color: '#808080', lineHeight: '22px' }}
                    >
                      {item.updatedAt.split('T')[0] +
                        ' ' +
                        item.updatedAt.split('T')[1].substr(0, 5) ||
                        item.createdAt.split('T')[0] +
                          ' ' +
                          item.createdAt.split('T')[1].substr(0, 5)}
                    </div>
                  </div>
                  <div className="row pt-2 pb-2">
                    <div className="col-9">
                      <div
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: '#808080',
                          lineHeight: '200%',
                          height: '35px',
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="col text-end"
                      style={{ color: '#808080', lineHeight: '35px' }}
                    >
                      {item.name}
                      &nbsp;&nbsp; level: {item.level}
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
                    <div className="fw-bold">게시글이 존재하지 않습니다</div>
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
            <Paging page={currentpage} count={count} setPage={setPage} />
          </div>
        </Div>
        <Footer />
      </div>
    </>
  );
}

export default ListView;
