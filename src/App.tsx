import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SDK from './pages/SDK';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sdk' element={<SDK />} />
    </Routes>
  )

}

export default App;
