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
      className="flex bg-white backdrop-blur-sm shadow-md border-b border-gray-300 z-50 fixed top-0 w-full p-3 px-4
            dark:bg-black dark:text-white
            "
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
