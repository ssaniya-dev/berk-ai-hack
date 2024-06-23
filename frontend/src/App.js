import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
