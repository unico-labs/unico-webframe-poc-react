import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CameraCapture from './pages/CameraCapture';
import PhotoResult from './pages/PhotoResult';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/capture" element={<CameraCapture />} />
        <Route path="/photo-result" element={<PhotoResult />} />
      </Route>
    </Routes>
  );
}

export default App;