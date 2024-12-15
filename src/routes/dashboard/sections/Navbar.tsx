import DarkModeBtn from '../../../components/DarkModeBtn';
import DropDown from '../../../components/DropDown';

const Navbar = () => {
  return (
    <div
      className="flex bg-white bg-opacity-40 backdrop-blur-sm shadow-md z-50 fixed top-0 w-full p-3 px-4
            dark:bg-black dark:text-white dark:bg-opacity-90
            "
    >
      <div className="flex-1 flex items-center">
        <p className="text-md">Bittu Kumar.</p>
      </div>
      <div className="flex gap-8 items-center">
        <DarkModeBtn />
        <DropDown />
      </div>
    </div>
  );
};

export default Navbar;
