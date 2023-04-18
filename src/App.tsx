import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index/Index';
import Tutorial from './pages/tutorial/Tutorial';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={''} element={<Index />} />
        <Route path={'/tutorial'} element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
