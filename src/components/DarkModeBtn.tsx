import { useState, useEffect } from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';

const DarkModeBtn = () => {
  const [isDark, setIsDark] = useState(false);

  const handleSwitch = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className=" relative cursor-pointer" onClick={handleSwitch}>
      <div
        className={` bg-gray-200 rounded-full h-6 w-12 flex items-center border-2 shadow-inner 
                ${isDark ? 'bg-gray-500 border-gray-500' : 'border-white-200'}
                `}
      >
        {isDark ? (
          <MdDarkMode className=" text-white ml-1" />
        ) : (
          <CiLight className=" w-full ml-5 text-black" />
        )}
      </div>
      <div
        className={` absolute h-6 w-6 top-0 transition-all ${isDark ? 'left-6' : 'left-0'} bg-white rounded-full border-2 border-gray-200
                ${isDark ? 'border-gray-500' : ''}

                `}
      ></div>
    </div>
  );
};

export default DarkModeBtn;
