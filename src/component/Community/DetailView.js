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
const ReplyButton = styled.button`
  /* 댓글 등록, 목록 버튼 스타일 */
  width: 60px;
  border-radius: 10px;
`;

function DetailView(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = location.state;
  const { userId, isLogin } = props;
  const [state, setState] = React.useState(false);

  const [post, setPost] = React.useState({});
  const [reply, setReply] = React.useState('');
  const [targetEdit, setTargetEdit] = React.useState({});
  const [replies, setReplies] = React.useState([]);

  React.useEffect(() => {
    if (id) {
      fetch('http://54.208.255.25:8080/api/post/detail/' + id, {
        method: 'GET',
        async: false,
      })
        .then((response) => {
          console.log('res', response);
          return response.json();
        })
        .then((data) => {
          setPost(data.post);
          setReplies(data.replies);
          setState(false);
        });
    }
  }, [id, state]);

  React.useEffect(() => {
    console.log('post', post);
    console.log('replies', replies);
  }, [post, replies]);

  const handleEditClick = () => {
    navigate('/community/add', { state: { post } });
  };

  const handleListClick = () => {
    navigate('/community');
  };

  const handleDelClick = () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      fetch('http://54.208.255.25:8080/api/post/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  const onChange = React.useCallback(
    (e) => {
      if (e.target.name === 'reply') {
        setReply(e.target.value);
      } else if (e.target.name === 'targetEdit') {
        setTargetEdit({ ...targetEdit, content: e.target.value });
      }
    },
    [targetEdit]
  );

  const onReplySaveClick = () => {
    console.log('test', { writer: userId, postID: post._id, content: reply });
    if (!reply) {
      alert('댓글 작성 후 등록해주세요.');
      document.querySelector("input[name='reply']").focus();
    } else {
      fetch('http://54.208.255.25:8080/api/reply/write', {
        method: 'POST',
        async: false,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          writer: userId,
          postID: post._id,
          content: reply,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          //alert('등록되었습니다.');
          console.log('res', res);
          setReply('');
          setState(true);
        })
        .catch((err) => {
          alert('댓글을 등록하는 데 실패하였습니다.');
          console.log('reply save error : ', err);
        });
    }
  };

  const onReplyEditClick = (id) => {
    if (targetEdit.state && !targetEdit.content) {
      alert('댓글 작성 후 등록해주세요.');
      document.querySelector("input[name='targetEdit']").focus();
    } else if (targetEdit.state && targetEdit.content) {
      //수정 후 등록
      fetch('http://54.208.255.25:8080/api/reply/update', {
        method: 'POST',
        async: false,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: id,
          content: targetEdit.content,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          //alert('등록되었습니다.');
          console.log('res', res);
          setTargetEdit({ state: false });
          setState(true);
        })
        .catch((err) => {
          alert('댓글을 등록하는 데 실패하였습니다.');
          console.log('reply save error : ', err);
        });
    } else {
      setTargetEdit({ id: id, state: true });
    }
  };

  const onReplyDelClick = (id) => {
    console.log('댓글삭제');
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      fetch('http://54.208.255.25:8080/api/reply/delete', {
        method: 'POST',
        async: false,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: id,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log('res', res);
          setState(true);
        })
        .catch((err) => {
          alert('댓글을 삭제하는 데 실패하였습니다.');
          console.log('reply delete error : ', err);
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
              <H3 className="col form-control-lg gr">{post.title}</H3>
              <div className="col form-control-lg d-flex justify-content-end">
                <Button
                  className="btn btn-outline-success "
                  type="button"
                  onClick={handleListClick}
                  style={{ marginRight: '1rem' }}
                >
                  목록
                </Button>
                {userId === post.writer && (
                  <>
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
                  </>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div
                class="input-group flex-nowrap form-control"
                style={{
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
                      {post.updatedAt
                        ? post.updatedAt.split('T')[0] +
                          ' ' +
                          post.updatedAt.split('T')[1].substr(0, 5)
                        : post.createdAt
                        ? post.createdAt.split('T')[0] +
                          ' ' +
                          post.createdAt.split('T')[1].substr(0, 5)
                        : null}
                    </div>
                  </div>
                  <div style={{ minHeight: '500px' }}>
                    <div
                      className="form-control-lg gr"
                      style={{ fontSize: '1em' }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      ></div>
                    </div>
                  </div>
                  {isLogin && (
                    <div
                      style={{
                        bottom: '10px',
                        width: '100%',
                      }}
                    >
                      <div className="d-flex">
                        <div
                          className="input-group nowrap"
                          style={{ width: '94%', marginRight: '10px' }}
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
                            widht="60%"
                            onClick={onReplySaveClick}
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                class="input-group flex-nowrap form-control"
                style={{ marginBotton: '100px' }}
              >
                <div className="col">
                  <div className="" style={{ margin: '10px 0 10px 0' }}>
                    <table>
                      <caption></caption>
                      <colgroup>
                        <col width="4%" />
                        <col width="*%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="17%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" className="text-center"></th>
                          <th scope="col" className="text-center"></th>
                          <th scope="col" className="text-center"></th>
                          <th scope="col" className="text-center"></th>
                          <th scope="col" className="text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {' '}
                        {replies.length > 0 ? (
                          replies.map((item, idx) => (
                            <tr className="">
                              <td className="form-control-lg gr" width="18%">
                                {item.name}
                              </td>
                              <td className="form-control-lg gr">
                                {targetEdit.state &&
                                targetEdit.id === item._id ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="댓글을 입력해 주세요."
                                    aria-label="reply"
                                    aria-describedby="addon-wrapping"
                                    name="targetEdit"
                                    value={targetEdit.content}
                                    onChange={onChange}
                                  />
                                ) : !targetEdit.state ? (
                                  item.content
                                ) : (
                                  item.content
                                )}
                              </td>
                              {item.writer === userId ? (
                                <>
                                  <td className="form-control-lg gr">
                                    <ReplyButton
                                      className="btn btn-outline-success"
                                      type="button"
                                      onClick={() => {
                                        onReplyEditClick(item._id);
                                      }}
                                    >
                                      {targetEdit.state &&
                                      targetEdit.id === item._id
                                        ? '등록'
                                        : '수정'}
                                    </ReplyButton>
                                  </td>
                                  <td className="form-control-lg gr">
                                    <ReplyButton
                                      className="btn btn-outline-success"
                                      type="button"
                                      onClick={() => {
                                        onReplyDelClick(item._id);
                                      }}
                                    >
                                      삭제
                                    </ReplyButton>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="form-control-lg gr"></td>
                                  <td className="form-control-lg gr"></td>
                                </>
                              )}
                              <td className="form-control-lg gr">
                                {item.updatedAt
                                  ? item.updatedAt.split('T')[0] +
                                    ' ' +
                                    item.updatedAt.split('T')[1].substr(0, 5)
                                  : item.createdAt
                                  ? item.createdAt.split('T')[0] +
                                    ' ' +
                                    item.createdAt.split('T')[1].substr(0, 5)
                                  : null}
                              </td>
                              
                            </tr>
                          ))
                        ) : (
                          <tr className="form-control-lg gr">
                            <td colSpan={'5'}>댓글이 없습니다.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Div>
        <div style={{ width: '100%', height: '100px' }}></div>
        <Footer />
      </div>
    </>
  );
}

export default DetailView;
