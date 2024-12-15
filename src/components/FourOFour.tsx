import { FaExclamationTriangle } from 'react-icons/fa';

const FourOFour = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <FaExclamationTriangle className="text-gray-500 dark:text-gray-300 text-6xl lg:text-8xl mb-6 text-shadow-md" />
      <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-700 dark:text-gray-100 text-shadow-sm">
        Page Not Found
      </h1>
      <p className="text-lg lg:text-xl px-7 text-gray-600 dark:text-gray-400 text-center mt-4 max-w-lg">
        Oops! The page you're looking for doesn't exist. It might have been
        removed or the URL is incorrect.
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        className="mt-8 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-50 font-semibold text-md rounded-lg shadow-md dark:bg-gray-600 dark:hover:bg-gray-500 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default FourOFour;
