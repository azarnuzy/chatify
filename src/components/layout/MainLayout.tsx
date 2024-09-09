// src/layouts/MainLayout.tsx
import { useEffect, useState } from 'react';
import { BsFillChatDotsFill, BsRobot } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline, IoMenu, IoMoon, IoSunny } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Toaster } from 'sonner';

import { connectSocket, disconnectSocket, socket } from '@/lib/socket';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useMediaQuery from '@/hooks/useMediaQuery';

import SideChat from '@/components/chat/SideChat';
import Sidebar from '@/components/sidebar/Sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { darkModeState } from '@/states/sidebar/atom';
import { userOnlineState } from '@/states/user/atom';
const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const isMobile = useMediaQuery(639); // Mobile threshold
  const location = useLocation(); // Get current route

  const [user] = useLocalStorage('user', 0);

  const userId = user?.user?.id;

  const [onlineUsers, setOnlineUsers] = useRecoilState(userOnlineState); // Store online users' IDs
  // Handle online users received from the WebSocket server
  useEffect(() => {
    connectSocket(); // Connect to the WebSocket server when component mounts

    // Listen for the 'onlineUsers' event from the server
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users.map((user: { user_id: number }) => user.user_id)); // Extract user_ids
    });

    // Clean up by disconnecting the socket when the component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      connectSocket(); // Establish socket connection

      // Emit the addNewUser event to the server
      socket.emit('addNewUser', userId);

      // Clean up and disconnect the socket when the component unmounts
      return () => {
        disconnectSocket();
      };
    }
  }, [userId]);

  // Helper to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/chat');
    }
    return location.pathname === path;
  };

  // Determine if the current route matches specific conditions
  const isChatPage = location.pathname.startsWith('/chat/');
  const isAiChatPage = location.pathname === '/ai-chat';
  const isHomePage = location.pathname === '/';

  // Determine if the SideChat should be visible
  const showSideChat = !isAiChatPage && (!isMobile || isHomePage || (isChatPage && !isMobile));

  // Get the appropriate width for the main content
  const mainContentWidth =
    showSideChat && !isMobile
      ? 'sm:w-[calc(100vw-300px-50px)] lg:w-[calc(100vw-360px-50px)] xl:w-[calc(100vw-480px-50px)]'
      : 'w-full';

  // Helper to generate icon and container classes
  const getIconClass = (path: string) => `text-3xl ${isActive(path) ? 'text-primary-main' : 'text-gray-500'}`;

  const getContainerClass = (path: string) =>
    `flex gap-2 items-center p-2 rounded-md ${isActive(path) ? 'bg-dark-200' : ''} transition-colors duration-300`;

  // Dark mode toggle button component
  const DarkModeToggle = () => (
    <div className="w-auto flex flex-col gap-4 items-center">
      <div
        className="flex items-center w-10 h-10 p-1 justify-center bg-primary-main rounded-full overflow-hidden relative cursor-pointer transition-transform duration-500 ease-in-out"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {/* Sun Icon */}
        <IoSunny
          className={`absolute text-white transition-transform duration-500 transform ease-in-out ${
            isDarkMode ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          } text-3xl`}
        />
        {/* Moon Icon */}
        <IoMoon
          className={`absolute transition-transform duration-500 transform ease-in-out ${
            !isDarkMode ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          } text-3xl pb-1 text-gray-900`}
        />
      </div>
    </div>
  );

  // Menu items array for easier management
  const menuItems = [
    { to: '/', label: 'Chats', icon: <IoChatbubbleEllipsesOutline className={getIconClass('/')} /> },
    { to: '/ai-chat', label: 'AI Chat', icon: <BsRobot className={getIconClass('/ai-chat')} /> }
  ];

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
        {isMobile && (
          <div className=" flex justify-between items-center">
            <div className="h-[50px] bg-neutral-200 flex gap-2 px-5 items-center">
              <BsFillChatDotsFill className="text-primary-main text-3xl" />
              <h4>Chatify</h4>
            </div>
            <Sheet>
              <SheetTrigger className="flex justify-center px-5">
                <IoMenu className="text-gray-500 text-3xl" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] py-3">
                <div className="flex gap-2 items-center pb-5">
                  <BsFillChatDotsFill className="text-primary-main text-3xl" />
                  <h4>Chatify</h4>
                </div>
                <div className="flex flex-col justify-between font-semibold h-[calc(100vh-50px-20px)]">
                  <ul className="flex flex-col gap-4">
                    {menuItems.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} className={getContainerClass(item.to)}>
                          {item.icon} {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 items-center">
                    <DarkModeToggle />
                    <span>Color Theme</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        <div className="flex h-[calc(100vh-50px)] flex-row border-2 shadow-md rounded-tl-md">
          {/* Render SideChat based on visibility rules */}
          {showSideChat && (
            <div
              className={`${isMobile && isHomePage ? 'w-full' : 'sm:w-[300px] lg:w-[360px] xl:w-[480px]'} py-4 border-r-2 shadow-xl bg-white rounded-md`}
            >
              <SideChat onlineUsers={onlineUsers} />
            </div>
          )}

          {/* Main content area */}

          <div
            className={`${mainContentWidth} ${isMobile && isHomePage && 'hidden'} ${isDarkMode ? 'bg-dark' : 'bg-light'} bg-repeat opacity-75 flex sm:justify-start items-center flex-col rounded-md not:rounded-tl-md`}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default MainLayout;
