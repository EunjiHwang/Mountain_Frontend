import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Input from '../memberStyled/Input';
import { renderMatches, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 50px;
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
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  //const items = useSelector((state) => state);
  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(10); //페이지당 콘텐츠 개수

  const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
  const [currentPosts, setCurrentPosts] = React.useState(0);

  const [searchText, setSearchText] = React.useState('');
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/post/main', {
      method: 'GET',
      async: false,
    })
      .then((response) => {
        console.log('res', response);
        return response.json();
      })
      .then((data) => {
        console.log('data', data.list);
        // for (let i = 0; i < data.list.length; i++) {
        //   setItems([data.list[i]]);
        // }
        setItems(data.list);

        console.log('items', items);
      });
  }, []);

  React.useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

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
      fetch('/api/post/main/' + searchText, {
        method: 'GET',
        async: false,
      })
        .then((response) => {
          console.log('res', response);
          return response.json();
        })
        .then((data) => {
          console.log('data', data.list);
          // for (let i = 0; i < data.list.length; i++) {
          //   setItems([data.list[i]]);
          // }
          setItems(data.list);
        });
    }
  };

  const onDetailClick = (id) => {
    if (id) {
      fetch('/api/post/detail/' + id, {
        method: 'GET',
        async: false,
      })
        .then((response) => {
          console.log('res', response);
          return response.json();
        })
        .then((data) => {
          console.log('data', data.post);
          const post = data.post;
          const replies = data.replies;
          navigate('/community/detail/' + id, { state: { post, replies } });
        });
    }
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
                  <input /*Input 시 이상해짐 */
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
                  style={{ borderRadius: '15px', padding: '10px 0 10px 0' }}
                  key={item._id}
                  onClick={() => onDetailClick(item.count)}
                >
                  <div className="row pt-2">
                    <div className="col-9">
                      <div className="fw-bold" style={{ fontSize: '1.4em' }}>
                        {item.title}
                      </div>
                    </div>
                    <div className="col text-end" style={{ color: '#808080' }}>
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
                        }}
                      >
                        {item.content}
                      </div>
                    </div>
                    <div className="col text-end" style={{ color: '#808080' }}>
                      {item.writer}
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
