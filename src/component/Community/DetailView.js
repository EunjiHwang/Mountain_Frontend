import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 50px;
`;

const H3 = styled.h3`
  /* 제목 스타일 */
  font-weight: bold;
  margin-top: 10px;
  color: #4c8969;
  font-size: 25px;
`;

const Button = styled.button`
  /* 등록, 목록 버튼 스타일 */
  margin: 10px;
  width: 60px;
  border-radius: 10px;
`;

function DetailView(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [reply, setReply] = React.useState('');
  const { post, replies } = location.state;

  React.useEffect(() => {
    console.log('post', post);
    console.log('replies', replies);
  }, [post, replies]);

  const handleEditClick = () => {
    navigate('/community/add', { state: { post } });
  };

  const handleDelClick = () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      fetch('/api/post/delete', {
        method: 'POST',
        async: false,
        body: JSON.stringify({ _id: post._id }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          alert('게시물이 삭제되었습니다.');
          navigate('/community');
        })
        .catch((err) => {
          alert('게시물을 삭제하는 데 실패하였습니다.');
          console.log('post delete error : ', err);
        });
    }
  };

  const onChange = React.useCallback((e) => {
    setReply(e.target.value);
  }, []);

  const onReplySaveClick = () => {
    if (!reply) {
      alert('댓글 작성 후 등록해주세요.');
      document.querySelector("input[name='reply']").focus();
    } else {
      fetch('/api/reply/write', {
        method: 'POST',
        async: false,
        body: JSON.stringify({
          writer: post.writer,
          postID: post._id,
          content: reply,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log('res', res);
          console.log(
            JSON.stringify({
              writer: post.writer,
              postID: post._id,
              content: reply,
            })
          );
        })
        .catch((err) => {
          alert('댓글을 등록하는 데 실패하였습니다.');
          console.log('reply save error : ', err);
        });
    }
  };
  const onReplyEditClick = () => {
    console.log('댓글수정');
  };
  const onReplyDelClick = () => {
    console.log('댓글삭제');
  };

  return (
    <>
      <div>
        <Header />
        <Div>
          <div className="container">
            <div className="row border-bottom border-success border-3">
              <H3 className="col form-control-lg gr">{post.title}</H3>
              <div className="col form-control-lg d-flex justify-content-end">
                <Button
                  className="btn btn-outline-success "
                  type="button"
                  onClick={handleEditClick}
                  style={{ marginRight: '1rem' }}
                >
                  수정
                </Button>
                <Button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={handleDelClick}
                  style={{ marginRight: '1rem' }}
                >
                  삭제
                </Button>
              </div>
            </div>
            <div className="row mt-4">
              <div
                class="input-group flex-nowrap form-control"
                style={{
                  minHeight: '500px',
                  position: 'relative',
                  marginBottom: '10px',
                }}
              >
                <div className="col">
                  <div
                    className="border-bottom border-success border-3 d-flex justify-content-between"
                    style={{ margin: '10px 0 10px 0' }}
                  >
                    <div className="form-control-lg gr">{post.name}</div>
                    <div className="form-control-lg gr">
                      {post.updatedAt.split('T')[0] ||
                        post.createdAt.split('T')[0]}
                    </div>
                  </div>
                  <div>
                    <div
                      className="form-control-lg gr"
                      style={{ fontSize: '1em' }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      ></div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      width: '100%',
                    }}
                  >
                    <div className="d-flex">
                      <div
                        className="input-group flex-nowrap"
                        style={{ width: '93%', marginRight: '10px' }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="댓글을 입력해 주세요."
                          aria-label="reply"
                          aria-describedby="addon-wrapping"
                          name="reply"
                          value={reply}
                          onChange={onChange}
                        />
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={onReplySaveClick}
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-group flex-nowrap form-control">
                <div className="col">
                  <div
                    className="d-flex justify-content-between"
                    style={{ margin: '10px 0 10px 0' }}
                  >
                    {replies.length > 0 ? (
                      replies.map((item, idx) => (
                        <>
                          <div className="form-control-lg gr">
                            {item.writer}
                          </div>
                          <div className="form-control-lg gr">
                            {item.content}
                          </div>
                          <div className="form-control-lg gr">
                            <button
                              className="btn btn-outline-success"
                              type="button"
                              onClick={onReplyEditClick}
                            >
                              수정
                            </button>
                          </div>
                          <div className="form-control-lg gr">
                            <button
                              className="btn btn-outline-success"
                              type="button"
                              onClick={onReplyDelClick}
                            >
                              삭제
                            </button>
                          </div>
                          <div className="form-control-lg gr">
                            {item.content}
                          </div>
                          <div className="form-control-lg gr">
                            {item.updatedAt || item.createdAt}
                          </div>
                        </>
                      ))
                    ) : (
                      <div className="form-control-lg gr">댓글이 없습니다.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Div>
        <Footer />
      </div>
    </>
  );
}

export default DetailView;
