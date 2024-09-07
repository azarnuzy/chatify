import { Route, Routes } from 'react-router-dom';

import './App.css';

import LoginPage from '@/pages/Login';

import { AuthProvider } from './hooks/useAuth';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
