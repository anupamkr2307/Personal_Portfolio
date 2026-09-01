import React, { useEffect, useState } from 'react';

export const CursorFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full transition-transform duration-75 ease-out blur-3xl opacity-20 dark:opacity-30 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"
      style={{
        width: '320px',
        height: '320px',
        left: `${position.x - 160}px`,
        top: `${position.y - 160}px`,
      }}
    />
  );
};
