import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { CreateAlarm } from './Pages/CreateAlarm'; // Importación requerida

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CreateAlarm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;