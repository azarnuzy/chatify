import { BsFillChatDotsFill, BsRobot } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline, IoMenu, IoMoon, IoSunny } from 'react-icons/io5';
import { MdOutlineLogout } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { darkModeState } from '../../states/sidebar/atom';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const location = useLocation();

  // Helper to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/chat');
    }
    return location.pathname === path;
  };

  // Helper to generate icon and container classes
  const getIconClass = (path: string) => `text-3xl ${isActive(path) ? 'text-primary-main' : 'text-gray-500'}`;

  const getContainerClass = (path: string) =>
    `flex gap-2 items-center p-2 rounded-md ${isActive(path) ? 'bg-dark-200' : ''} transition-colors duration-300 hover:bg-dark-200`;

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
    <div className="flex flex-col items-center my-3 h-[calc(100vh-24px)]">
      <BsFillChatDotsFill className="text-primary-main text-3xl mb-5" />
      <div className="flex flex-col h-full justify-between items-center">
        <div className="flex flex-col gap-4">
          <Sheet>
            <SheetTrigger className="flex justify-center">
              <IoMenu className="text-gray-500 text-3xl" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[200px] py-3">
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
                <div className="flex flex-col gap-4">
                  <button className="rounded-md transition-colors duration-300 hover:bg-dark-200 w-full flex gap-2 py-1 items-center">
                    <MdOutlineLogout className="text-3xl text-gray-500" />
                    Logout
                  </button>
                  <div className="flex gap-2 items-center">
                    <DarkModeToggle />
                    <span>Color Theme</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.to} className={getContainerClass(item.to)}>
                <Link to={item.to}>{item.icon}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center">
          {/* <Button className="rounded-md transition-colors duration-300 hover:bg-dark-200" variant="ghost">
          </Button> */}
          <button className="rounded-md transition-colors duration-300 hover:bg-dark-200 w-full flex justify-center py-1 ">
            <MdOutlineLogout className="text-3xl text-gray-500" />
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
