import { Route, Routes } from 'react-router-dom';

import './App.css';

import { AuthProvider } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/Login';
import { ProtectedRoute } from './routing/ProtectedRoute';
import { Secret } from './routing/Secret';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/secret"
          element={
            <ProtectedRoute>
              <Secret />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
