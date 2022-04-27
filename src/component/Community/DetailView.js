import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { renderMatches, useNavigate } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';

function AddView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const items = useSelector((state) => state);

  React.useEffect(() => {
    console.log('목록페이지', items);
  }, [items]);

  const handleClick = () => {
    navigate('/');
  };

  const handleSaveClick = () => {
    console.log('등록');
  };
  return (
    <>
      <div>
      <Header />
        <div className="row border-bottom border-success border-3">
          <div className="col">
            <h1 className="form-control-lg gr">게시글 작성하기</h1>
          </div>
          <div className="col-1" style={{ width: '6%' }}>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleSaveClick}
              style={{ float: 'right' }}
            >
              등록
            </button>
          </div>
          <div className="col-1" style={{ width: '6%' }}>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleClick}
              style={{ float: 'right' }}
            >
              목록
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control"
              placeholder="제목을 입력해 주세요."
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div class="flex-nowrap">
            <CKEditor
              editor={ClassicEditor}
              style={{ border: '1px solid', borderRadius: '0.25rem' }}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </div>
        </div>
        <Footer />
      </div>

    </>
  );
}

export default AddView;
