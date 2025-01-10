import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const BackBtn = () => {
  return (
    <Link
      to="/"
      className=" absolute left-0 md:rounded-lg rounded-r-lg top-16 flex items-center gap-3 border w-fit p-2 px-2 py-1 pr-3 dark:text-white shadow-lg mb-4"
    >
      <IoIosArrowBack /> Back
    </Link>
  );
};

export default BackBtn;
