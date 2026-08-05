import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { RiContactsLine, RiArrowRightLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa6';

function ConnectBtn() {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };
  useEffect(() => {
    if (innerWidth < 700) {
      setExpand(true);
    }
  }, []);

  return (
    <div className="flex gap-5 mt-10 md:flex-row flex-col items-center md:justify-start justify-center ">
      <button
        onClick={handleExpand}
        className="group btn btn-sm h-10 px-5 rounded-full border-0 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 normal-case"
      >
        <RiContactsLine className="text-lg transition-transform duration-300 group-hover:rotate-12" />
        <span>Get in Touch</span>
        <RiArrowRightLine className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <div
        className={`flex flex-row gap-2 transition-all duration-300 ease-in-out ${
          expand ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px]'
        }`}
      >
        <FaLinkedinIn
          size={32}
          onClick={() =>
            window.open(
              'https://www.linkedin.com/in/bittukumar183040/',
              '_blank',
            )
          }
          className=" rounded-md p-1.5 cursor-pointer transition-colors duration-200 ease-linear
            hover:bg-blue-600 hover:text-white hover:border-blue-600
            dark:text-white dark:hover:text-blue-600 dark:hover:bg-gray-200 dark:hover:border-blue-600"
        />
        <FaGithub
          size={32}
          onClick={() =>
            window.open('https://github.com/BittuKumar183040', '_blank')
          }
          className=" rounded-full p-1.5 cursor-pointer transition-colors duration-200 ease-linear
          hover:bg-gray-800 hover:text-white
          dark:text-white dark:hover:text-gray-800 dark:hover:bg-gray-200"
        />
      </div>
    </div>
  );
}

export default ConnectBtn;
