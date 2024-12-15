import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import { RiContactsLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa6';

function ConnectBtn() {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className="flex gap-2 mt-10 md:flex-row flex-col items-center md:justify-start justify-center ">
      <button
        onClick={handleExpand}
        className="btn btn-sm btn-outline bg-white transition-colors duration-200 ease-linear mr-4
          dark:text-white dark:bg-gray-900 dark:border-white
          hover:dark:bg-gray-200 hover:dark:text-black"
      >
        <RiContactsLine className="mr-1" />
        <span>Get in Touch</span>
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
          dark:text-white dark:hover:text-black dark:hover:bg-gray-200"
        />
      </div>
    </div>
  );
}

export default ConnectBtn;
