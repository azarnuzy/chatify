// src/App.tsx
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { AuthProvider } from '@/hooks/useAuth';

// import AiChat from '@/components/chat/AiChat';
import ChatContent from '@/components/chat/ChatContent';
import MainLayout from '@/components/layout/MainLayout';

import AiChat from '@/pages/AiChat';
// import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat/:roomId" element={<ChatContent />} />
          <Route path="/ai-chat" element={<AiChat />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
