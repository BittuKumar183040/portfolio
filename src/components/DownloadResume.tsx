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
      className=" absolute top-6 right-6 text-sm flex gap-4 border items-center cursor-pointer
      shadow-lg p-1 w-fit rounded-md
      hover:shadow transition-all dark:shadow-gray-800 dark:bg-black bg-white dark:text-white"
    >
      <FiDownload size={25} className=" p-1" />
    </div>
  );
};

export default DownloadResume;
