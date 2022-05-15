import React, { Component } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { renderMatches, useNavigate, useLocation } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';

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

function DetailView(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const items = useSelector((state) => state);

  const { post, replies } = location.state;

  React.useEffect(() => {
    console.log('목록페이지', items);
    console.log('post', post);
    console.log('replies', replies);
  }, [items, post, replies]);

  const handleClick = () => {
    navigate('/community');
  };

  const onReplyClick = () => {
    console.log('댓글등록');
  };

  return (
    <>
      <div>
        <Header />
        <Div>
          <div className="container">
            <div className="row border-bottom border-success border-3">
              <div className="col">
                <H3 className="form-control-lg gr">{post.title}</H3>
              </div>
            </div>
            <div className="row mt-4">
              <div
                class="input-group flex-nowrap form-control"
                style={{ minHeight: '500px', position: 'relative' }}
              >
                <div className="col">
                  <div
                    className="border-bottom border-success border-3 d-flex justify-content-between"
                    style={{ margin: '10px 0 10px 0' }}
                  >
                    <div className="form-control-lg gr">{post.writer}</div>
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
                      {post.content}
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
                        />
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={onReplyClick}
                        >
                          등록
                        </button>
                      </div>
                    </div>
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
