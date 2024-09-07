import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { darkModeState } from '../../states/sidebar/atom';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [, setMode] = useLocalStorage('mode', !isDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    setMode(!isDarkMode);
  };

  return <></>;
};

export default Sidebar;
