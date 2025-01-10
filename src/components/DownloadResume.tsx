import resume from '../routes/resume/asset/Resume_2024.pdf';
import { FiDownload } from 'react-icons/fi';

const DownloadResume = () => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Bittu_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <div
      onClick={handleResumeDownload}
      className=" fixed top-[53px] text-sm right-6 flex gap-4 border border-t-0 border-gray-300 items-center cursor-pointer z-50 
      shadow-lg rounded-b-lg p-1 px-5 pb-2
      hover:shadow transition-all dark:shadow-gray-800 dark:bg-black bg-white dark:text-white"
    >
      <FiDownload />
      <p>Download</p>
    </div>
  );
};

export default DownloadResume;
