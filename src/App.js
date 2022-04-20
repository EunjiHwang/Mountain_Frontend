import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Intro from './component/Intro';
import Map from './component/Map';
import Login from './component/Login';
import Join from './component/Join';
import Password from './component/Password';
import Community from './component/Community';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} exact={true} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<Community />} />
        <Route path="/join" element={<Join />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </div>
  );
}

export default App;
