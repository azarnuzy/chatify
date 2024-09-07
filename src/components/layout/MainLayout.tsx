import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { darkModeState } from '../../states/sidebar/atom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode] = useRecoilState(darkModeState);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return <></>;
};

export default MainLayout;
