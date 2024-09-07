import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoMenu, IoMoon, IoSunny } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

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
        <IoMenu className="text-gray-500 text-3xl" />
        <div className={`w-auto flex flex-col gap-4 items-center`}>
          <li
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
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
