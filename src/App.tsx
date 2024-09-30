import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './screens/Main/Main';
import DetailScreen from './screens/Detail/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<DetailScreen />} /> {/* Ruta con el parámetro id */}
      </Routes>
    </Router>
  );
}

export default App;
