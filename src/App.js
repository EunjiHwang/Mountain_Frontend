import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Intro from './component/Intro';
import Map from './component/Map';
import Login from './component/Login';
import Join from './component/Join';
import Password from './component/Password';
import Community from './component/Community';
<<<<<<< HEAD
import Mypage from './component/Mypage';
=======
import GlobalStyle from './component/globalStyles';
import WriteReview from './component/WriteReview';
import EditReview from './component/EditReview';
>>>>>>> a843748dd0511f1cb7df7e4ae90e31ab8a9f6595

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} exact={true} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<Community />} />
        <Route path="/join" element={<Join />} />
        <Route path="/password" element={<Password />} />
<<<<<<< HEAD
        <Route path="/mypage" element={<Mypage />} />
=======
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/editreview" element={<EditReview />} />
>>>>>>> a843748dd0511f1cb7df7e4ae90e31ab8a9f6595
      </Routes>
    </div>
  );
}

export default App;
