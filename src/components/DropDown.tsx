import { RiMenu3Line} from "react-icons/ri";
import { RxDownload } from "react-icons/rx";
import resume from '../assets/resume/Resume_2024.pdf'

const DropDown = () => {

    const handleResumeDownload = () => {
        const link = document.createElement('a');
        link.href = resume;
        link.download = 'Bittu_Kumar_Resume.pdf';
        link.click();
    }

    return (
        <div className="dropdown dropdown-end">
            <RiMenu3Line tabIndex={0} size={25} className=" cursor-pointer"/>
            <ul tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                <li className="flex justify-between p-1 px-2 cursor-pointer hover:bg-slate-200 rounded-lg transition-colors
                    dark:hover:bg-black dark:bg-gray-800
                    "  onClick={handleResumeDownload}>
                    <p className=" flex justify-between text-md">Resume</p>
                    <div className=' tooltip tooltip-top ' data-tip="Download">
                        <RxDownload className=" cursor-pointer mx-1" size={20}/>
                    </div>
                </li>
            </ul>
        </div>
  )
}

export default DropDown