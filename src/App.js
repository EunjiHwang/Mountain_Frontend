import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Map from './component/Map';
import Login from './component/Login';
import Community from './component/Community';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} exact={true} />
        <Route path="/map" element={<Map />} />
        <Route path="Login" element={<Login />} />
        <Route path="Community" element={<Community />} />
      </Routes>
    </div>
  );
}

export default App;
