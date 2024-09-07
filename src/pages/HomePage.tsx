import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import SideChat from '@/components/chat/SideChat';
import Sidebar from '@/components/sidebar/Sidebar';

import { darkModeState } from '@/states/sidebar/atom';

const HomePage = () => {
  const [isDarkMode] = useRecoilState(darkModeState);
  return (
    <div className="flex">
      <div className="w-[50px] bg-neutral-200">
        <Sidebar />
      </div>
      <div className="flex flex-col w-[calc(100vw-50px)]">
        <div className="h-[50px] bg-neutral-200  flex items-center">
          <h4>Chatify</h4>
        </div>
        <div className="flex h-[calc(100vh-50px)] flex-row border-2  shadow-md rounded-md ">
          <div className="sm:w-[240px] lg:w-[360px] xl:w-[480px] py-4 flex flex-col  border-r-2 shadow-xl bg-white">
            <SideChat />
          </div>
          {/* Main Background  */}
          <div
            className={`${
              !isDarkMode ? 'bg-light' : 'bg-dark'
            } h-[calc(100vh-51.5px)]  sm:w-[calc(100vw-240px-50px)] lg:w-[calc(100wv-360px-50px)] xl:w-[calc(100vw-480px-50px)] bg-repeat opacity-75 `}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
