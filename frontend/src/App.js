import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './contexts/authContext/index';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
  </AuthProvider>
  );
}

export default App;
