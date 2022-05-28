import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header';
import Footer from '../Footer';
import { useEffect } from 'react';

const Div = styled.div`
  /* 전체 Div 스타일 */
  margin: 50px;
`;

const H3 = styled.h3`
  /* 제목 스타일 */
  font-weight: bold;
  margin-top: 15px;
  color: #4c8969;
  font-size: 25px;
`;

const Button = styled.button`
  /* 등록, 목록 버튼 스타일 */
  margin: 10px;
  width: 60px;
  border-radius: 10px;
`;

function AddView(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const quillRef = React.useRef(null);
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const post = location.state;
  const { userId, isLogin } = props;

  useEffect(() => {
    if (post) {
      setContent(post.post.content);
      setTitle(post.post.title);
    }
  }, [post, userId, isLogin]);

  const handleListClick = () => {
    if (window.confirm('목록으로 돌아가시겠습니까?')) {
      navigate('/community');
    }
  };

  const handleSaveClick = () => {
    let apiurl = ``;
    let postObj = {};
    if (post) {
      apiurl = 'http://54.208.255.25:8080/api/post/update';
      postObj = {
        _id: post.post._id,
        title,
        content,
      };
    } else {
      apiurl = 'http://54.208.255.25:8080/api/post/write';
      postObj = {
        writer: userId,
        title,
        content,
      };
    }
    if (!title) {
      alert('제목을 입력해 주세요.');
      document.querySelector("input[name='title']").focus();
      return false;
    } else if (!content || content === '<p><br></p>') {
      alert('내용을 입력해 주세요.');
      document.querySelector('.ql-editor').focus();
      return false;
    } else if (window.confirm('게시물을 저장하시겠습니까?')) {
      fetch(apiurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postObj),
      })
        .then((res) => res.json())
        .then((res) => {
          alert('등록되었습니다.');
          navigate('/community');
        });
    }
  };

   const handlePreview = () => {
     window.open(
       `popup.html?content=${content}`,
       'popup_window',
       'width=880px, height=640'
     );
     return;
   };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  return (
    <>
      <div>
        <Header />
        <Div>
          <div className="container">
            <div className="row border-bottom border-success border-3">
              <H3 className="col form-control-lg">게시글 작성하기</H3>
              <div className="col form-control-lg d-flex justify-content-end">
                <Button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={handleListClick}
                  style={{ marginRight: '1rem' }}
                >
                  목록
                </Button>
                <Button
                  className="btn btn-outline-success "
                  type="button"
                  onClick={handleSaveClick}
                  style={{ marginRight: '1rem' }}
                >
                  등록
                </Button>
                { <button
                  className="btn btn-outline-success"
                  style={{
                    width: '90px',
                    margin: '10px',
                    borderRadius: '10px',
                  }}
                  type="button"
                  onClick={handlePreview}
                >
                  미리보기
                </button> }
              </div>
            </div>
            <div className="row mt-4">
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="제목을 입력해 주세요."
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  name="title"
                  value={title}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="flex-nowrap"></div>
            </div>

            <ReactQuill
              style={{ height: '600px' }}
              theme="snow"
              ref={quillRef}
              placeholder="내용을 입력해 주세요."
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                  ['link'],
                  [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
                ],
              }}
              formats={[
                //'font',
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'align',
                'color',
                'background',
              ]}
              value={content || ''}
              onChange={(content, delta, source, editor) =>
                setContent(editor.getHTML())
              }
            />
          </div>
        </Div>
        <div style={{ width: '100%', height: '100px' }}></div>
        <Footer />
      </div>
    </>
  );
}

export default AddView;
