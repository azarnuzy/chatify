// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import { AuthProvider } from '@/hooks/useAuth';

// import AiChat from '@/components/chat/AiChat';
import MainLayout from '@/components/layout/MainLayout';

import AiChat from '@/pages/AiChat';
import DetailChatPage from '@/pages/DetailChat';
// import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import { ProtectedRoute } from '@/routing/ProtectedRoute';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/chat/:roomId" element={<DetailChatPage />} />
            <Route path="/ai-chat" element={<AiChat />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
