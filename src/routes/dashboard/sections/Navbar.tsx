import DarkModeBtn from '../../../components/DarkModeBtn';
import NavBarBtn from '../../../components/NavBarBtn';
import { MdOutlineDocumentScanner } from 'react-icons/md';

const Navbar = () => {
  const handleClick = (e: any) => {
    if (e.target.id === 'Curriculum Vitae') {
      window.location.href = '/curriculumvitae';
    }
  };

  return (
    <div
      className="flex md:w-10/12 w-full bg-white bg-opacity-15 backdrop-blur-sm rounded-3xl shadow-md border-b border-gray-300 z-40 fixed left-1/2 -translate-x-1/2 top-0 p-3 px-4
        dark:bg-slate-950 dark:bg-opacity-25 dark:text-white"
    >
      <div className="flex-1 flex items-center">
        <p className="text-md">Bittu Kumar.</p>
      </div>
      <div className="flex gap-8 items-center">
        <DarkModeBtn />
        <NavBarBtn
          title="Curriculum Vitae"
          icon={<MdOutlineDocumentScanner />}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Navbar;
