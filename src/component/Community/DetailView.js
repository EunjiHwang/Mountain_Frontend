import React, { Component } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { renderMatches, useNavigate } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import { Paging } from '../Paging';

  const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 50px;
  font-family: 'Segoe UI';
`;

const H3 = styled.h3`
  /* 제목 스타일 */
  font-weight: bold;
  margin-top:10px;
  color:#4C8969;
 font-size:25px;
`;

function DetailView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const items = useSelector((state) => state);

  React.useEffect(() => {
    console.log('목록페이지', items);
  }, [items]);

  const handleClick = () => {
    navigate('/community');
  };

  const handleSaveClick = () => {
    console.log('등록');
  };
  

  
  return (
    <>
      <div>
      <Header />
      <Div>
        <div className="row border-bottom border-success border-3">
          <div className="col">
            <H3>게시글 작성하기</H3>
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
              config={{
                placeholder: '제목을 입력해 주세요.',
                toolbar: {
                  items: [
                    'heading',
                    '|',
                    'fontfamily',
                    'fontsize',
                    '|',
                    'alignment',
                    '|',
                    'fontColor',
                    'fontBackgroundColor',
                    '|',
                    'bold',
                    'italic',
                    'strikethrough',
                    'underline',
                    'subscript',
                    'superscript',
                    '|',
                    'link',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'todoList',
                    '|',
                    'code',
                    'codeBlock',
                    '|',
                    'insertTable',
                    '|',
                    'uploadImage',
                    'blockQuote',
                    '|',
                    'undo',
                    'redo',
                  ],
                  shouldNotGroupWhenFull: true,
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
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
      </Div>
      </div>
    </>
  );
}

export default DetailView;

  