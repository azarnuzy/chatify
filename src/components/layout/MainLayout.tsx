// src/layouts/MainLayout.tsx
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import useMediaQuery from '@/hooks/useMediaQuery';

import SideChat from '@/components/chat/SideChat';
import Sidebar from '@/components/sidebar/Sidebar';

import { darkModeState } from '@/states/sidebar/atom';

const MainLayout = () => {
  const [isDarkMode] = useRecoilState(darkModeState);
  const isMobile = useMediaQuery(639); // Mobile threshold
  const location = useLocation(); // Get current route

  // Determine if the current route matches specific conditions
  const isChatPage = location.pathname.startsWith('/chat/');
  const isAiChatPage = location.pathname === '/ai-chat';
  const isHomePage = location.pathname === '/';

  // Determine if the SideChat should be visible
  const showSideChat = !isAiChatPage && (!isMobile || isHomePage || isChatPage);

  // Get the appropriate width for the main content
  const mainContentWidth =
    showSideChat && !isMobile
      ? 'sm:w-[calc(100vw-300px-50px)] lg:w-[calc(100vw-360px-50px)] xl:w-[calc(100vw-480px-50px)]'
      : 'w-full';

  return (
    <div className="flex">
      {/* Sidebar for larger devices */}
      {!isMobile && (
        <div className="w-[50px] bg-neutral-200">
          <Sidebar />
        </div>
      )}

      <div className={`flex flex-col bg-neutral-200 w-full ${!isMobile ? 'w-[calc(100vw-50px)]' : ''}`}>
        {/* Header for non-mobile devices */}
        <div className="hidden h-[50px] bg-neutral-200 sm:flex items-center">
          <h4>Chatify</h4>
        </div>

        {/* Header for mobile on non-chat pages */}
        {(isHomePage || isChatPage) && isMobile && (
          <div className="h-[50px] bg-neutral-200 flex gap-2 px-5 items-center">
            <BsFillChatDotsFill className="text-primary-main text-3xl" />
            <h4>Chatify</h4>
          </div>
        )}

        <div className="flex h-[calc(100vh-50px)] flex-row border-2 shadow-md rounded-tl-md">
          {/* Render SideChat based on visibility rules */}
          {showSideChat && (
            <div
              className={`${isMobile ? 'w-full' : 'sm:w-[300px] lg:w-[360px] xl:w-[480px]'} py-4 border-r-2 shadow-xl bg-white rounded-md`}
            >
              <SideChat />
            </div>
          )}

          {/* Main content area */}
          <div
            className={`${mainContentWidth} ${isDarkMode ? 'bg-dark' : 'bg-light'} bg-repeat opacity-75 flex sm:justify-start items-center flex-col rounded-md not:rounded-tl-md`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
