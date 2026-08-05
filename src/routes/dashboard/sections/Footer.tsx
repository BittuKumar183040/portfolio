import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
} from "react-icons/io5";
import me from "../../../assets/me.svg";

const Footer = () => {
  return (
    <footer className="border-t dark:border-gray-200 dark:bg-white dark:text-gray-700 transition-colors duration-300 border-gray-800 bg-black text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div className="flex items-center gap-5">
          <img
            src={me}
            alt="Bittu Kumar"
            className="h-14 w-14 rounded-2xl border dark:border-gray-200 object-cover shadow-lg border-gray-700"
          />

          <div>
            <h3 className="text-lg font-semibold dark:text-gray-900 text-white">
              Bittu Kumar
            </h3>

            <p className="mt-1 text-sm dark:text-gray-500 text-gray-400">
              Full Stack Engineer • WebGL • Three.js • FastAPI
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="text-sm dark:text-gray-500 text-gray-500">
            © {new Date().getFullYear()} Bittu Kumar.
          </p>

          <p className="mt-1 text-xs dark:text-gray-400 text-gray-600">
            Designed & Built with React, TypeScript and Tailwind CSS.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:-translate-y-11">
          <a
            href="https://github.com/bittukumar183040"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border dark:border-gray-200 p-3 transition-all duration-300 hover:-translate-y-1 dark:hover:border-blue-500 dark:hover:bg-blue-50 dark:hover:text-blue-600 border-gray-700 hover:border-sky-500 hover:bg-gray-900 hover:text-sky-400"
          >
            <IoLogoGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/bittu-kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border dark:border-gray-200 p-3 transition-all duration-300 hover:-translate-y-1 dark:hover:border-blue-500 dark:hover:bg-blue-50 dark:hover:text-blue-600 border-gray-700 hover:border-sky-500 hover:bg-gray-900 hover:text-sky-400"
          >
            <IoLogoLinkedin size={20} />
          </a>

          <a
            href="mailto:bk183040@gmail.com"
            className="rounded-xl border dark:border-gray-200 p-3 transition-all duration-300 hover:-translate-y-1 dark:hover:border-blue-500 dark:hover:bg-blue-50 dark:hover:text-blue-600 border-gray-700 hover:border-sky-500 hover:bg-gray-900 hover:text-sky-400"
          >
            <IoMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;