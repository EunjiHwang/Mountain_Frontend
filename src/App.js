import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Intro from './component/Intro';
import Map from './component/Map';
import Login from './component/Login';
import Join from './component/Join';
import Password from './component/Password';
import AddView from './component/Community/AddView';
import ListView from './component/Community/ListView';
import DetailView from './component/Community/DetailView';
import Mypage from './component/Mypage';
import GlobalStyle from './component/globalStyles';
import WriteReview from './component/WriteReview';
import EditReview from './component/EditReview';
import MyWriting from './component/Mypage/MyWriting';
import MyComment from './component/Mypage/MyComment';
import MyReview from './component/Mypage/MyReview';
import EditMe from './component/EditMe';
import PasswordNext from './component/PasswordNext';
import Chatbot from './component/Chatbot';
import Header from './component/Header';

function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [passwordToken, setPasswordToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('passwordToken')) {
      const pwToken = localStorage.getItem('passwordToken');
      setPasswordToken(pwToken);
    }
    console.log(passwordToken);
  })

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      // 저장된 token 값이 없다면
      localStorage.setItem('isLogin', false);
    } else {
      // 저장된 token값이 있다면 로그인이 된 상태
      localStorage.setItem('isLogin', true); // 상태 변경
    }
  });

  // userId props로 가져가서 사용하면 됨
  useEffect(() => {
    setUserId(localStorage.getItem('userId'));

    // Main용
    if (localStorage.getItem('isLogin') === 'true') setIsLogin(true);
    else setIsLogin(false);

    // console.log(userId);
  });

  return (
    <div>
      <GlobalStyle />
      <Chatbot />
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/" element={<Main isLogin={isLogin} />} exact={true} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/community"
          element={<ListView isLogin={isLogin} userId={userId} />}
        />
        <Route
          path="/community/add"
          element={<AddView isLogin={isLogin} userId={userId} />}
        />
        <Route
          path="/community/edit"
          element={<AddView isLogin={isLogin} userId={userId} />}
        />
        <Route
          path="/community/detail/:id"
          element={<DetailView isLogin={isLogin} userId={userId} />}
        />
        <Route path="/join" element={<Join />} />
        <Route path="/password" element={<Password />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/editreview" element={<EditReview />} />
        <Route
          path="/mywriting"
          element={<MyWriting isLogin={isLogin} userId={userId} />}
        />
        <Route 
         path="/mycomment" 
         element={<MyComment  isLogin={isLogin} userId={userId} />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/editme" element={<EditMe />} />
        <Route
          path="/passwordnext/:passwordToken"
          element={<PasswordNext passwordToken={passwordToken}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
