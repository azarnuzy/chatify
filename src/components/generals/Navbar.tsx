import React from 'react';
import { useRecoilState } from 'recoil';

import { darkModeState } from '../../states/sidebar/atom';

const Navbar = () => {
  const [isDarkMode] = useRecoilState(darkModeState);
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-semibold">Chat Application</h1>
      </div>
    </nav>
  );
};

export default Navbar;
