import React from 'react';
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

function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} exact={true} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<ListView />} />
        <Route path="/community/add" element={<AddView />} />
        <Route path="/community/edit" element={<AddView />} />
        <Route path="/community/detail/:id" element={<DetailView />} />
        <Route path="/join" element={<Join />} />
        <Route path="/password" element={<Password />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/writereview" element={<WriteReview />} />
        <Route path="/editreview" element={<EditReview />} />
        <Route path="/mywriting" element={<MyWriting />} />
        <Route path="/mycomment" element={<MyComment />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/editme" element={<EditMe />} />
      </Routes>
    </div>
  );
}

export default App;
