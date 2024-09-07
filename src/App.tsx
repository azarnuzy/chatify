import { Route, Routes } from 'react-router-dom';

import './App.css';

import ChatContent from '@/components/chat/ChatContent';
import ContentHomePage from '@/components/homepage/ContentHomePage';

import LoginPage from '@/pages/Login';

import { AuthProvider } from './hooks/useAuth';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<ContentHomePage />} />
          <Route path="/chat/:roomId" element={<ChatContent />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
