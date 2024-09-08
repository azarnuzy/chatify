import { BsFillChatDotsFill, BsRobot } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline, IoMenu, IoMoon, IoSunny } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { darkModeState } from '../../states/sidebar/atom';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center my-3 h-[calc(100vh-24px)]">
      <BsFillChatDotsFill className="text-primary-main main text-3xl mb-5" />
      <div className="flex flex-col h-full justify-between items-center">
        <Sheet>
          <SheetTrigger>
            <IoMenu className="text-gray-500 text-3xl" />
          </SheetTrigger>
          <SheetContent side={'left'} className="w-[200px] py-3">
            <div className="flex gap-2 items-center mb-5">
              <BsFillChatDotsFill className="text-primary-main main text-3xl" />
              <h4>Chatify</h4>
            </div>
            <div className="flex flex-col justify-between font-semibold h-[calc(100vh-50px-20px)]">
              <ul className="flex flex-col gap-4">
                <li className="flex gap-2 items-center">
                  <IoMenu className="text-gray-500 text-3xl" />
                </li>
                <li className="flex gap-2 items-center">
                  <IoChatbubbleEllipsesOutline className="text-gray-500 text-3xl" /> Chats
                </li>
                <li className="flex gap-2 items-center">
                  <BsRobot className="text-gray-500 text-3xl" /> AI Chat
                </li>
              </ul>
              <div className="flex gap-2 items-center ">
                <div
                  className="flex items-center w-10 h-10 p-1 justify-center bg-primary-main rounded-full overflow-hidden relative"
                  onClick={() => toggleDarkMode()}
                >
                  <IoSunny
                    className={`absolute text-white ${
                      isDarkMode ? 'translate-y-[250%]' : 'translate-y-0'
                    } duration-300 text-3xl transform transition-transform ease-in-out`}
                  />
                  <IoMoon
                    className={`absolute ${
                      !isDarkMode ? 'translate-y-[250%]' : 'translate-y-0'
                    } duration-300 text-3xl pb-1  transform transition-transform ease-in-out text-gray-900`}
                  />
                </div>
                Color Theme
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className={`w-auto flex flex-col gap-4 items-center`}>
          <div
            className="flex items-center w-10 h-10 p-1 justify-center bg-primary-main rounded-full overflow-hidden relative"
            onClick={() => toggleDarkMode()}
          >
            <IoSunny
              className={`absolute text-white ${
                isDarkMode ? 'translate-y-[250%]' : 'translate-y-0'
              } duration-300 text-3xl transform transition-transform ease-in-out`}
            />
            <IoMoon
              className={`absolute ${
                !isDarkMode ? 'translate-y-[250%]' : 'translate-y-0'
              } duration-300 text-3xl pb-1  transform transition-transform ease-in-out text-gray-900`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
