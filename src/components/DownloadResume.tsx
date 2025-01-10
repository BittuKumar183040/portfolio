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
      className=" flex gap-2 items-center absolute top-[54px] right-10 cursor-pointer z-30 shadow-lg rounded-b-lg p-2 px-6 
      hover:shadow transition-all dark:bg-black bg-white dark:text-white"
    >
      <FiDownload />
      <p>Download</p>
    </div>
  );
};

export default DownloadResume;
