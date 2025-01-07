import { Link, useParams } from 'react-router-dom';
import { projects } from '../../assets/data/projects';
import FourOFour from '../../components/FourOFour';
import ProjectImagePreview from './ProjectImagePreview';
import { FaGithub, FaRegEye } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import useDocumentTitle from '../documentTitle/ChangeTitle';

const Project = () => {
  let { id } = useParams();
  const project = projects.find((project) => project.id === id);

  useDocumentTitle(project?.title)

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!project) return <FourOFour />;

  return (
    <div className=" container relative mx-auto pt-32 gap-8 px-2 md:px-0 ">
      <div
        className=" fixed top-12  left-1/2 -translate-x-1/2 shadow-lg rounded-b-2xl bg-white dark:bg-black bg-opacity-40 backdrop-blur-sm 
        px-8 py-3"
      >
        <div className="card-actions flex-1 justify-end items-end flex gap-5 dark:text-gray-300">
          {project.gitLink && (
            <div className=" tooltip tooltip-left " data-tip="Github">
              <FaGithub
                className=" cursor-pointer"
                onClick={() => window.open(project.gitLink, '_blank')}
                size={25}
              />
            </div>
          )}
          {project.previewLink && (
            <div className=" tooltip tooltip-right" data-tip="Project Preview">
              <FaRegEye
                className=" cursor-pointer"
                onClick={() => window.open(project.previewLink, '_blank')}
                size={25}
              />
            </div>
          )}
        </div>
      </div>
      <Link
        to="/"
        className=" absolute left-0 md:rounded-lg rounded-r-lg top-16 flex items-center gap-3 border w-fit p-2 px-2 py-1 pr-3 dark:text-white shadow-lg mb-4"
      >
        <IoIosArrowBack /> Back
      </Link>
      <p className=" text-3xl pb-10 dark:text-white">{project.title}</p>
      <div className="flex flex-col lg:flex-row gap-8 pb-10">
        <ProjectImagePreview images={project.imageSource} />
        <div dangerouslySetInnerHTML={{ __html: project.description }} />
      </div>
    </div>
  );
};

export default Project;
