import { BsFillChatDotsFill } from 'react-icons/bs';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import useMediaQuery from '@/hooks/useMediaQuery'; // Import the custom hook

import SideChat from '@/components/chat/SideChat';
import Sidebar from '@/components/sidebar/Sidebar';

import { darkModeState } from '@/states/sidebar/atom';

const HomePage = () => {
  const [isDarkMode] = useRecoilState(darkModeState);
  const isMobile = useMediaQuery(639); // Set threshold for mobile (768px)
  const location = useLocation(); // Get the current route

  const isChatPage = location.pathname.startsWith('/chat/'); // Check if it's a chat page

  return (
    <div className="flex">
      {/* Sidebar for all devices */}
      {!isMobile && (
        <div className="w-[50px] bg-neutral-200">
          <Sidebar />
        </div>
      )}

      <div className={`flex flex-col w-full ${!isMobile ? 'w-[calc(100vw-50px)]' : ''}`}>
        <div className="hidden h-[50px] bg-neutral-200  sm:flex items-center">
          <h4>Chatify</h4>
        </div>
        {!isChatPage && isMobile && (
          <div className="h-[50px] bg-neutral-200 flex gap-2 px-5 items-center">
            <BsFillChatDotsFill className="text-primary-main main text-3xl " />
            <h4>Chatify</h4>
          </div>
        )}
        <div className="flex h-[calc(100vh-50px)] flex-row border-2 shadow-md rounded-md">
          {/* SideChat visibility based on route and device */}
          {(!isMobile || (!isChatPage && isMobile)) && (
            <div
              className={`${isMobile ? 'w-full' : 'sm:w-[300px] lg:w-[360px] xl:w-[480px]'} py-4 flex flex-col border-r-2 shadow-xl bg-white`}
            >
              <SideChat />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`${
              isDarkMode ? 'bg-dark' : 'bg-light'
            }  sm:w-[calc(100vw-300px-50px)] lg:w-[calc(100wv-360px-50px)] xl:w-[calc(100vw-480px-50px)] bg-repeat opacity-75 flex sm:justify-start items-center flex-col`}
          >
            {/* Hide ContentHomePage on mobile or show ChatContent based on route */}
            {(!isMobile || isChatPage) && <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
